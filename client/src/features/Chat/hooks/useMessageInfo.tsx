import { Message, MessageType } from '@/types';
import { useMemo } from 'react';
import {
  formatDateTime,
  formatTime,
  isAudio,
  isImage,
  isVideo,
} from '../utils';
import { API_BASE_URL } from '@/constants';
import { getFileExtension } from '@/utils';

const useMessageInfo = (message: Message) => {
  const isOutgoing = !message.isAiMessage;

  const chatPartnerId = message.chatId;

  const time = useMemo(
    () => (message.createdAt ? formatTime(message.createdAt) : '??'),
    [message.createdAt],
  );

  const dateTime = useMemo(
    () => (message.createdAt ? formatDateTime(message.createdAt) : ''),
    [message.createdAt],
  );

  const fileUrl = useMemo(
    () =>
      message.id > 0 && message.attachment
        ? `${API_BASE_URL}/messages/file/${message.attachment.name}`
        : undefined,
    [message],
  );

  const type: MessageType = useMemo(() => {
    if (!message.attachment) return 'text';
    const extension = getFileExtension(message.attachment.name);
    if (isImage(extension)) return 'photo';
    if (isVideo(extension)) return 'video';
    if (isAudio(extension)) return 'audio';
    return 'file';
  }, [message.attachment]);

  return {
    type,
    isOutgoing,
    chatPartnerId,
    time,
    dateTime,
    fileUrl,
  };
};

export default useMessageInfo;
