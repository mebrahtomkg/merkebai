import BackLink from '@/components/BackLink';
import { useIsMobile } from '@/hooks';
import { type FC, useRef, useCallback } from 'react';
import { useParams } from 'react-router';
import {
  MessageInput,
  PendingMessages,
  ChatMessages,
  ChatContextMenu,
} from './components';
import {
  ChatFooter,
  ChatHeader,
  ChatMessagesList,
  ChatMessagesListContainer,
  ChatStyled,
  Gap,
} from './styles';
import { useChat } from './hooks';
import ChatInfo from './components/ChatInfo';

const Chat: FC = () => {
  const params = useParams();

  const chatId = params?.chatId ? Number.parseInt(params.chatId, 10) : 0;

  const messagesListContainerRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  const chat = useChat(chatId);

  const scrollMessagesListToBottom = useCallback(() => {
    const messagesListContainer = messagesListContainerRef.current;
    if (messagesListContainer) {
      const { scrollHeight, clientHeight } = messagesListContainer;
      messagesListContainer.scrollTop = scrollHeight - clientHeight;
    }
  }, []);

  return (
    <ChatStyled>
      <ChatHeader>
        {isMobile && <BackLink />}

        {chat && <ChatInfo chat={chat} />}

        {chatId && <ChatContextMenu chatId={chatId} />}
      </ChatHeader>

      <ChatMessagesListContainer ref={messagesListContainerRef}>
        <ChatMessagesList>
          <Gap />

          <ChatMessages
            partnerId={chatId}
            intersectionObserverRootRef={messagesListContainerRef}
          />

          <PendingMessages
            chatId={chatId}
            intersectionObserverRootRef={messagesListContainerRef}
            scrollMessagesListToBottom={scrollMessagesListToBottom}
          />

          <Gap />
        </ChatMessagesList>
      </ChatMessagesListContainer>

      <ChatFooter>
        <MessageInput chatId={chatId} />
      </ChatFooter>
    </ChatStyled>
  );
};

export default Chat;
