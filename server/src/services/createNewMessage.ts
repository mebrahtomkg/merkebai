import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import { emitToUser } from '@/socket/emitter';
import { filterMessageData } from '@/utils';

interface MessageCreationPayload {
  chatId: number;
  content: string;
  isAiMessage: boolean;
  userId: number;
}

const createNewMessage = async (payload: MessageCreationPayload) => {
  const transaction = await sequelize.transaction();

  try {
    const { chatId, content, isAiMessage, userId } = payload;

    const chat = await Chat.findByPk(chatId, {
      transaction,
    });

    if (!chat) {
      throw new Error('Chat does not exist with the provided chatId!');
    }

    const message = await Message.create(
      {
        chatId,
        isAiMessage,
        content,
        attachmentId: null,
      },
      { transaction },
    );

    await chat.update(
      {
        lastMessageId: message.id,
      },
      { transaction },
    );

    const savedMessage = await Message.scope(['withAttachment']).findByPk(
      message.id,
      { transaction },
    );

    if (!savedMessage) {
      throw new Error('Unable to fetch saved message from database.');
    }

    await transaction.commit();

    const filteredMessage = filterMessageData(savedMessage);

    if (isAiMessage) {
      emitToUser(userId, 'message_received', { message: filteredMessage });
    }

    return savedMessage;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default createNewMessage;
