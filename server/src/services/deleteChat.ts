import sequelize from '@/config/db';
import { Chat, Message } from '@/models';

export class ChatDeleteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatDeleteError';
  }
}

interface ChatDeleteProps {
  userId: number;
  chatId: string;
}

const deleteChat = async ({ userId, chatId }: ChatDeleteProps) => {
  const transaction = await sequelize.transaction();

  try {
    const chat = await Chat.findOne({
      where: { id: chatId },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!chat) {
      throw new ChatDeleteError('Chat not found!');
    }

    if (chat.userId !== userId) {
      throw new ChatDeleteError('This is not your chat to delete.');
    }

    // Hard delete all messages that are in this chat.
    await Message.destroy({
      where: { chatId },
      transaction,
    });

    // Delete the chat itself
    await chat.destroy({ transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default deleteChat;
