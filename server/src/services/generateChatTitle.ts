import { Chat, Message } from '@/models';
import { emitToUser } from '@/socket/emitter';
import { aiApiClient } from '@/config/general';

interface ChatTitleGeneratePayload {
  userId: number;
  chatId: string;
}

const generateChatTitle = async (payload: ChatTitleGeneratePayload) => {
  try {
    const { userId, chatId } = payload;

    const messages = await Message.findAll({
      where: { chatId },
      order: [['createdAt', 'ASC']],
      limit: 2,
    });

    if (!messages || messages.length === 0) {
      console.log(
        `[generateChatTitle] No messages found for chat ${chatId}, skipping title generation.`,
      );
      return;
    }

    // Format the conversation as a labeled block of text
    const conversation = messages
      .map(
        (message) =>
          `${message.isAiMessage ? 'Assistant(AI)' : 'User'}: ${message.content}`,
      )
      .join('\n');

    // We put the instructions at the bottom so they are the last thing the AI reads.
    const prompt = `
      You are a professional editor for a premium AI application. 
      Your task is to generate a clean, recognizable title for the conversation provided below.

      CONVERSATION LOG:
      """
      ${conversation}
      """

      INSTRUCTIONS:
      1. Create a title that is 5 to 6 words long.
      2. Use Title Case (e.g., "Advanced Python Debugging").
      3. Be specific to the topic; avoid generic titles like "Chat with AI".
      4. Output ONLY the title text. No quotes, no periods, no "Title: " prefix.
    `.trim();

    const response = await aiApiClient.responses.create({
      model: 'gemini-2.5-flash-lite',
      input: [{ role: 'user', content: prompt }],
    });

    // Clean up the response to ensure it's a "Perfect Title"
    const title = response.output_text
      .replace(/^(Title|Topic|Subject):\s+/i, '')
      .replace(/^["']|["']$/g, '')
      .replace(/[.!]$/, '')
      .trim();

    if (!title) {
      console.warn(
        `[generateChatTitle] AI returned an empty title for chat ${chatId}`,
      );
      return;
    }

    await Chat.update(
      { title },
      {
        where: { id: chatId },
      },
    );

    const chat = await Chat.scope('withLastMessage').findOne({
      where: { id: chatId },
    });

    emitToUser(userId, 'chat_updated', chat?.toJSON());
  } catch (err) {
    console.error('[generateChatTitle] Error generating chat title:', err);
  }
};

export default generateChatTitle;
