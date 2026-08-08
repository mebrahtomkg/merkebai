import { Attachment, Message } from '@/models';
import filterAttachmentData from './filterAttachmentData';

interface FilteredMessageData
  extends Pick<
    Message,
    | 'id'
    | 'chatId'
    | 'isAiMessage'
    | 'isCompleted'
    | 'content'
    | 'isSeen'
    | 'createdAt'
  > {
  attachment?: Partial<Attachment>;
}

const filterMessageData = (message: Message): FilteredMessageData => {
  const attachment = message.attachment
    ? filterAttachmentData(message.attachment)
    : undefined;

  const { id, chatId, isAiMessage, isCompleted, content, createdAt, isSeen } =
    message.toJSON();

  return { id, chatId, isAiMessage, isCompleted, content, createdAt, isSeen };
};

export default filterMessageData;
