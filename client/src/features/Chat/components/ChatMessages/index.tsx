import { FC, RefObject, useEffect, useMemo } from 'react';
import BaseMessage from '../BaseMessage';
import { useChatMessages } from '../../hooks';

interface ChatMessagesProps {
  chatId: number;
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>;
  scrollMessagesListToBottom: () => void;
}

const ChatMessages: FC<ChatMessagesProps> = ({
  chatId,
  intersectionObserverRootRef,
  scrollMessagesListToBottom,
}) => {
  const messages = useChatMessages(chatId);

  const messagesInComponent = useMemo(() => {
    return messages.map((message, index) => (
      <BaseMessage
        key={`${message.id}`}
        message={message}
        isLastInGroup={
          messages[index + 1] &&
          messages[index + 1].isAiMessage !== message.isAiMessage
        }
        intersectionObserverRootRef={intersectionObserverRootRef}
      />
    ));
  }, [messages, intersectionObserverRootRef]);

  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : undefined;

  const lastMessageContent = lastMessage?.content;

  useEffect(() => {
    if (lastMessageContent) {
      scrollMessagesListToBottom();
    }
  }, [scrollMessagesListToBottom, lastMessageContent]);

  return <>{messagesInComponent}</>;
};

export default ChatMessages;
