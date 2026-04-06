import sequelize from '@/config/db';
import { Attachment, Chat, Message, User } from '@/models';
import { filterMessageData } from '@/utils';

export class MessageSendError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'MessageSendError';
    this.status = status;
  }
}

interface BaseMessageSendPayload {
  messageType: 'text' | 'attachment';
  userId: number;
  chatId?: number;
}

interface TextMessageSendPayload extends BaseMessageSendPayload {
  messageType: 'text';
  content: string;
}

interface AttachmentSendPayload extends BaseMessageSendPayload {
  messageType: 'attachment';
  attachment: Pick<
    Attachment,
    'name' | 'originalname' | 'size' | 'width' | 'height' | 'caption'
  >;
}

type MessageSendPayload = TextMessageSendPayload | AttachmentSendPayload;

const sendMessage = async (payload: MessageSendPayload) => {
  const transaction = await sequelize.transaction();

  try {
    const { messageType, userId, chatId } = payload;

    const senderId = userId;

    let content: string | null = null;

    if (messageType === 'text') {
      content = payload.content.trim();

      if (!content) {
        throw new MessageSendError('Invalid message content.', 400);
      }
      //TODO: Check content for xss security, filter it.
    }

    let chat: Chat | null = null;

    if (!chatId) {
      chat = await Chat.create(
        { userId },
        {
          transaction,
          lock: transaction.LOCK.UPDATE,
        },
      );
    } else {
      chat = await Chat.findOne({
        where: { id: chatId },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!chat) {
        throw new MessageSendError('Chat not found', 404);
      }
    }

    const sender = await User.findOne({
      where: { id: senderId },
      limit: 1,
      transaction,
    });

    if (!sender) {
      throw new MessageSendError('Sender does not exist.', 409);
    }

    let attachment: Attachment | null = null;

    if (messageType === 'attachment') {
      attachment = await Attachment.create(payload.attachment, {
        transaction,
      });
    }

    const message = await Message.create(
      {
        senderId,
        chatId: chat.id,
        content,
        attachmentId: attachment?.id || null,
        receiverId: 0,
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

    return {
      message: filteredMessage,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default sendMessage;
