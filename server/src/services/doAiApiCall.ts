import { Message } from '@/models';
import { emitToUser } from '@/socket/emitter';
import { filterMessageData } from '@/utils';
import createNewMessage from './createNewMessage';
import { aiApiClient } from '@/config/general';
import generateChatTitle from './generateChatTitle';

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
      content: 'Thinking...',
      isAiMessage: true,
      userId,
    });

    const filteredMessage = filterMessageData(message);

    try {
      const response = await aiApiClient.responses.create({
        model: 'gemini-2.5-flash',
        stream: true,
        input: latestMessages.reverse().map((message) => ({
          role: message.isAiMessage ? 'assistant' : 'user',
          content: message.content as string,
        })),
      });

      let fullAiContent = '';

      for await (const event of response) {
        if (event.type === 'response.output_text.delta') {
          const text = event.delta;

          fullAiContent += text;

          emitToUser(userId, 'message_updated', {
            ...filteredMessage,
            content: fullAiContent,
          });
        }
      }

      await Message.update(
        {
          content: fullAiContent,
        },
        { where: { id: message.id } },
      );

      generateChatTitle({ chatId, userId });
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
