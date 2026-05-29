import { Op } from 'sequelize';
import { Chat, Message } from '@/models';

export class MessageMarkAsReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageMarkAsReadError';
  }
}

interface MessageMarkAsReadProps {
  userId: number;
  chatId: number;
  messageId: number;
}

const markMessageAsRead = async ({
  userId,
  chatId,
  messageId,
}: MessageMarkAsReadProps) => {
  const chat = await Chat.findOne({
    where: { id: chatId },
  });

  if (!chat) {
    throw new MessageMarkAsReadError('Chat not found!');
  }

  if (chat.userId !== userId) {
    throw new MessageMarkAsReadError(
      'This is not your chat to mark message as read.',
    );
  }

  await Message.update(
    { isSeen: true },
    {
      where: {
        chatId,
        isSeen: false,
        isAiMessage: true,
        id: {
          [Op.lte]: messageId,
        },
      },
    },
  );

  const unseenMessagesCount = await Message.count({
    where: {
      chatId,
      isAiMessage: true,
      isSeen: false,
    },
  });

  return { unseenMessagesCount };
};

export default markMessageAsRead;
