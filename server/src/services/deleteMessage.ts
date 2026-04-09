import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import deleteMessageFiles from './deleteMessageFiles';

export class MessageDeleteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageDeleteError';
  }
}

interface MessageDeleteProps {
  userId: number;
  messageId: number;
}

const deleteMessage = async ({ userId, messageId }: MessageDeleteProps) => {
  const transaction = await sequelize.transaction();

  const staleFiles: string[] = [];

  try {
    const message = await Message.scope([
      'withAttachment',
      'withChat',
    ]).findByPk(messageId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!message) {
      throw new MessageDeleteError('Message not found.');
    }

    // Whether the user is sender or receiver of this message
    const isUserSenderOrReceiver = message.chat?.userId === userId;

    if (!isUserSenderOrReceiver) {
      throw new MessageDeleteError(
        'You have no permission to delete this message.',
      );
    }

    const { chatId } = message;

    // Lock the parent Chat row to prevent concurrent updates to its lastMessageId fields.
    await Chat.findByPk(chatId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (message.attachment) staleFiles.push(message.attachment.name);
    await message.destroy({ transaction });

    const [lastMessage] = await Promise.all([
      Message.findOne({
        where: {
          chatId,
        },
        order: [['createdAt', 'DESC']],
        limit: 1,
        transaction,
      }),
    ]);

    const lastMessageId = lastMessage?.id || null;

    if (lastMessageId) {
      await Chat.update(
        { lastMessageId },
        {
          where: { id: chatId },
          transaction,
        },
      );
    } else {
      await Chat.destroy({
        where: { id: chatId },
        transaction,
      });
    }

    await transaction.commit();

    deleteMessageFiles(staleFiles); // no need to await
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default deleteMessage;
