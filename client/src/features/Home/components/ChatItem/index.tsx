import { FC } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStyled,
  ClockIconContainer,
  MessagePreviewContainer,
  MessageStatusContainer,
  Title,
  TitleContainer,
  TickIconContainer,
  UnseenMessagesCount,
} from './styles';
import { Chat } from '@/types';
import useChatItemInfo from './useChatItemInfo';
import MessagePreview from './MessagePreview';
import { ClockIcon, DoubleTickIcon, TickIcon } from '@/components/icons';
import { useMessageStatus } from '@/features/Chat/hooks';
import { useNavigate, useParams } from 'react-router';
import ChatContextMenu from '../ChatContextMenu';
import useShowChildOnHover from './useShowChildOnHover';
import { useAppStateStore } from '@/store';
import { useIsMobile } from '@/hooks';

interface ChatItemProps {
  chat: Chat;
  index: number;
}

const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const params = useParams();

  const closeSidebar = useAppStateStore((state) => state.closeSidebar);

  const { title } = chat;

  const navigate = useNavigate();

  const lastMessage = chat.lastMessage;

  const lastMessageStatus = useMessageStatus(lastMessage?.id || 0);

  const { dateTime } = useChatItemInfo(chat);

  const unseenMessagesCount = chat.unseenMessagesCount || 0;

  const isLastMessageOutgoing = lastMessage && !lastMessage.isAiMessage;

  const handleClick = () => {
    closeSidebar();
    navigate(`/${chat.id}`);
  };

  const { isChildVisible, handleMouseEnter, handleMouseLeave } =
    useShowChildOnHover();

  const isCurrentlyOpenedChat = chat.id === params.chatId;

  const isMobile = useIsMobile();

  return (
    <ChatItemStyled
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      $isCurrentlyOpenedChat={isCurrentlyOpenedChat}
    >
      <ChatItemInfoContainer>
        <TitleContainer>
          <Title>{title || 'New Chat'}</Title>
          {dateTime && <ChatItemDateTime>{dateTime}</ChatItemDateTime>}
        </TitleContainer>

        <MessagePreviewContainer>
          {lastMessage && <MessagePreview message={lastMessage} />}

          {unseenMessagesCount > 0 && (
            <UnseenMessagesCount>{unseenMessagesCount}</UnseenMessagesCount>
          )}

          {lastMessage && isLastMessageOutgoing && (
            <MessageStatusContainer>
              {lastMessageStatus === 'sending' ||
              lastMessageStatus === 'updating' ? (
                <ClockIconContainer>
                  <ClockIcon />
                </ClockIconContainer>
              ) : (
                <TickIconContainer>
                  {lastMessage.isSeen ? <DoubleTickIcon /> : <TickIcon />}
                </TickIconContainer>
              )}
            </MessageStatusContainer>
          )}
        </MessagePreviewContainer>
      </ChatItemInfoContainer>

      {(isChildVisible || isMobile) && <ChatContextMenu chat={chat} />}
    </ChatItemStyled>
  );
};

export default ChatItem;
