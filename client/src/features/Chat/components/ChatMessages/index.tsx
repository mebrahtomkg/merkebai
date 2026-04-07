import { FC, RefObject, useMemo } from 'react';
import BaseMessage from '../BaseMessage';
import { useChatMessages } from '../../hooks';

interface ChatMessagesProps {
  chatId: number;
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>;
}

const ChatMessages: FC<ChatMessagesProps> = ({
  chatId,
  intersectionObserverRootRef,
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

  return <>{messagesInComponent}</>;
};

export default ChatMessages;
