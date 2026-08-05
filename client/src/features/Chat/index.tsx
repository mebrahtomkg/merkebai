import BackLink from '@/components/BackLink';
import { useIsMobile } from '@/hooks';
import { type FC, useRef, useCallback } from 'react';
import { useParams } from 'react-router';
import { MessageInput, PendingMessages, ChatMessages } from './components';
import {
  ChatFooter,
  ChatHeader,
  ChatMessagesList,
  ChatMessagesListContainer,
  ChatStyled,
  Gap,
  IntroText,
} from './styles';

const Chat: FC = () => {
  const params = useParams();

  const chatId = params.chatId;

  const messagesListContainerRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  const scrollMessagesListToBottom = useCallback(() => {
    const messagesListContainer = messagesListContainerRef.current;
    if (messagesListContainer) {
      const { scrollHeight, clientHeight } = messagesListContainer;
      messagesListContainer.scrollTop = scrollHeight - clientHeight;
    }
  }, []);

  return (
    <ChatStyled>
      {isMobile && (
        <ChatHeader>
          <BackLink />
        </ChatHeader>
      )}

      {chatId && (
        <ChatMessagesListContainer ref={messagesListContainerRef}>
          <ChatMessagesList>
            <Gap />

            {chatId && (
              <ChatMessages
                chatId={chatId}
                intersectionObserverRootRef={messagesListContainerRef}
                scrollMessagesListToBottom={scrollMessagesListToBottom}
              />
            )}

            {chatId && (
              <PendingMessages
                chatId={chatId}
                intersectionObserverRootRef={messagesListContainerRef}
                scrollMessagesListToBottom={scrollMessagesListToBottom}
              />
            )}

            <Gap />
          </ChatMessagesList>
        </ChatMessagesListContainer>
      )}

      {!chatId && <IntroText>Hello! What's on your mind?</IntroText>}

      <ChatFooter>
        <MessageInput chatId={chatId} />
      </ChatFooter>
    </ChatStyled>
  );
};

export default Chat;
