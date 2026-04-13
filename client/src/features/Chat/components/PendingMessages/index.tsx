import { FC, RefObject, useEffect, useMemo } from 'react';
import BaseMessage from '../BaseMessage';
import usePendingMessages from './usePendingMessages';

interface PendingMessagesProps {
  chatId: string;
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>;
  scrollMessagesListToBottom: () => void;
}

const PendingMessages: FC<PendingMessagesProps> = ({
  chatId,
  intersectionObserverRootRef,
  scrollMessagesListToBottom,
}) => {
  const messages = usePendingMessages(chatId);

  const messagesInComponent = useMemo(() => {
    return messages.map((message) => (
      <BaseMessage
        key={`${message.id}`}
        message={message}
        isLastInGroup={false}
        intersectionObserverRootRef={intersectionObserverRootRef}
      />
    ));
  }, [messages, intersectionObserverRootRef]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollMessagesListToBottom();
    }
  }, [messages.length, scrollMessagesListToBottom]);

  return <>{messagesInComponent}</>;
};

export default PendingMessages;
