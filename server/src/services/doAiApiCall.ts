import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import { emitToUser } from '@/socket/emitter';
import { filterMessageData } from '@/utils';
import { GoogleGenAI } from '@google/genai';
import { Content } from '@google/genai/node';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

interface AiApiCallPayload {
  userId: number;
  chatId: number;
}

const doAiApiCall = async (payload: AiApiCallPayload) => {
  const transaction = await sequelize.transaction();

  try {
    const { userId, chatId } = payload;

    const historyMessages = await Message.findAll({
      where: { chatId },
      order: [['createdAt', 'ASC']],
      limit: 10,
      transaction,
    });

    const contents: Content[] = historyMessages.map((message) => ({
      role: message.isAiMessage ? 'model' : 'user',
      parts: [{ text: message.content as string }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents,
    });

    const chat = await Chat.findByPk(chatId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!chat) {
      throw new Error('Invalid chat fetched from database!');
    }

    const message = await Message.create(
      {
        chatId,
        isAiMessage: true,
        content: response.text,
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

    const sentMessage = await Message.scope(['withAttachment']).findByPk(
      message.id,
      { transaction },
    );

    if (!sentMessage) {
      throw new Error('Unable to fetch saved message from database.');
    }

    const filteredMessage = filterMessageData(sentMessage);

    await transaction.commit();

    emitToUser(userId, 'message_received', { message: filteredMessage });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default doAiApiCall;
