import { Message } from '@/models';
import { emitToUser } from '@/socket/emitter';
import { filterMessageData } from '@/utils';
import { GoogleGenAI } from '@google/genai';
import { Content } from '@google/genai/node';
import createNewMessage from './createNewMessage';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

interface AiApiCallPayload {
  userId: number;
  chatId: string;
}

const doAiApiCall = async (payload: AiApiCallPayload) => {
  try {
    const { userId, chatId } = payload;

    const latestMessages = await Message.findAll({
      where: { chatId },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    const message = await createNewMessage({
      chatId,
      content: 'Please wait...',
      isAiMessage: true,
      userId,
    });

    const filteredMessage = filterMessageData(message);

    const contents: Content[] = latestMessages.reverse().map((message) => ({
      role: message.isAiMessage ? 'model' : 'user',
      parts: [{ text: message.content as string }],
    }));

    try {
      const response = await ai.models.generateContentStream({
        model: 'gemini-3.1-flash-lite-preview',
        contents,
      });

      let fullAiContent = '';

      for await (const chunk of response) {
        const text = chunk.text;

        fullAiContent += text;

        emitToUser(userId, 'message_updated', {
          ...filteredMessage,
          content: fullAiContent,
        });
      }

      await Message.update(
        {
          content: fullAiContent,
        },
        { where: { id: message.id } },
      );
    } catch (error) {
      const errorContent =
        'I had trouble answering your prompt. please try again.';

      await Message.update(
        {
          content: errorContent,
        },
        { where: { id: message.id } },
      );

      emitToUser(userId, 'message_updated', {
        ...filteredMessage,
        content: errorContent,
      });

      throw error;
    }
  } catch (err) {
    console.log(err);
  }
};

export default doAiApiCall;
