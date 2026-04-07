import { Request, Response, NextFunction } from 'express';
import { Chat, Message } from '@/models';
import { filterMessageData } from '@/utils';

const listChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not Authenticated!' });
      return;
    }

    const userId = req.userId;

    const [chats, unseenMessages] = await Promise.all([
      Chat.findAll({
        where: { userId: userId },
        include: [
          {
            model: Message.scope('withAttachment'),
            as: 'lastMessage',
            required: true,
          },
        ],
      }),

      // Fetch all messages sent to this user which are unread by the user yet. this single
      // query heps us to calculate number of unseen messages for each chat.
      Message.findAll({
        attributes: ['chatId'],
        where: {
          isAiMessage: true,
          isSeen: false,
        },
      }),
    ]);

    // Chats transformation steps:
    // #1 Validate and filter message data
    // #2 Sort chats based on last message's creation time.
    //    A chat with newer last message comes first.
    // #3 Calculate and assign number of unseen messages for each chat.
    const transformedChats = chats
      .map((chat) => {
        const { id, title } = chat;

        if (!chat.lastMessage) {
          throw new Error('Invalid lastMessage of a chat!');
        }

        const lastMessage = filterMessageData(chat.lastMessage);

        return { id, lastMessage, title };
      })
      .sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt)
      .map((chat) => ({
        ...chat,
        unseenMessagesCount: unseenMessages.filter(
          (message) => message.chatId === chat.id,
        ).length,
      }));

    res.status(200).json({
      success: true,
      data: transformedChats,
      message: 'Chats retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default listChats;
