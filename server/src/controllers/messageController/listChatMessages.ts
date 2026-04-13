import { Request, Response, NextFunction } from 'express';
import { filterMessageData, isPositiveInteger } from '@/utils';
import { Message } from '@/models';

const listChatMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chatId =
      typeof req.params.chatId === 'string' ? req.params.chatId.trim() : null;

    if (!chatId) {
      res.status(400).json({
        message: 'Invalid chat id.',
      });
      return;
    }

    const userId = req.userId as number;

    const messages = await Message.scope(['withAttachment']).findAll({
      where: {
        chatId,
      },
    });

    const data = messages.map((message) => filterMessageData(message));

    res.status(200).json({
      success: true,
      data,
      message: 'Messages retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default listChatMessages;
