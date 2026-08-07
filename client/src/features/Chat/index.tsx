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
  DynamicBottomGap,
  Gap,
  IntroText,
} from './styles';
import SidebarButton from './components/SidebarButton';
import { useAppStateStore } from '@/store';
import NewChatButton from './components/NewChatButton';

const Chat: FC = () => {
  const params = useParams();

  const chatId = params.chatId;

  const messagesListContainerRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  const openSidebar = useAppStateStore((s) => s.openSidebar);

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
          <SidebarButton onClick={openSidebar} />

          <NewChatButton />
        </ChatHeader>
      )}

      {chatId && (
        <ChatMessagesListContainer ref={messagesListContainerRef}>
          <ChatMessagesList>
            <Gap key={'top-gap'} />

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

            <DynamicBottomGap key={'bottom-gap'} />
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
