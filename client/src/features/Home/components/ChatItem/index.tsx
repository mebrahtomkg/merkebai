import { FC } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStyled,
  ClockIconContainer,
  MessagePreviewContainer,
  MessageStatusContainer,
  NameContainer,
  TickIconContainer,
  UnseenMessagesCount,
} from './styles';
import { useAccount } from '@/hooks';
import { Chat } from '@/types';
import useChatItemInfo from './useChatItemInfo';
import MessagePreview from './MessagePreview';
import { ClockIcon, DoubleTickIcon, TickIcon } from '@/components/icons';
import { useMessageStatus } from '@/features/Chat/hooks';
import { useNavigate } from 'react-router';

interface ChatItemProps {
  chat: Chat;
  index: number;
}

const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const navigate = useNavigate();

  const lastMessage = chat.lastMessage;

  const lastMessageStatus = useMessageStatus(lastMessage?.id || 0);

  const { id: selfId } = useAccount();

  const { dateTime } = useChatItemInfo(chat);

  const unseenMessagesCount = chat.unseenMessagesCount || 0;

  const isLastMessageOutgoing = lastMessage && lastMessage.senderId === selfId;

  const handleClick = () => {
    navigate(`/chat/${chat.id}`);
  };

  return (
    <ChatItemStyled type="button" onClick={handleClick}>
      <ChatItemInfoContainer>
        <NameContainer>
          {dateTime && <ChatItemDateTime>{dateTime}</ChatItemDateTime>}
        </NameContainer>

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
    </ChatItemStyled>
  );
};

export default ChatItem;
