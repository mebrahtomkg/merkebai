import { useCallback, useMemo } from 'react';
import { Chat } from '@/types';
import formatChatTimestamp from '../../formatChatTimestamp';
import { useCurrentDateTime } from '@/hooks';
import { useNavigate, useParams } from 'react-router';
import { useMessageStatus } from '@/features/Chat/hooks';
import { addChatDeleteRequest } from '@/store/useMessageRequestsStore';
import { useAppStateStore } from '@/store';

const useChatItem = (chat: Chat) => {
  const params = useParams();
  const navigate = useNavigate();

  const currentDateTime = useCurrentDateTime();

  const { title, lastMessage } = chat;

  const createdAt = lastMessage?.createdAt;

  const dateTime = useMemo(
    () => (createdAt ? formatChatTimestamp(createdAt, currentDateTime) : null),
    [createdAt, currentDateTime],
  );

  const unseenMessagesCount = chat.unseenMessagesCount || 0;

  const isLastMessageOutgoing = lastMessage && !lastMessage.isAiMessage;

  const isCurrentlyOpenedChat = chat.id === params.chatId;

  const lastMessageStatus = useMessageStatus(lastMessage?.id || 0);

  const deleteChat = useCallback(
    () => addChatDeleteRequest({ chatId: chat.id }),
    [chat.id],
  );

  const closeSidebar = useAppStateStore((state) => state.closeSidebar);

  const handleClick = () => {
    closeSidebar();
    navigate(`/${chat.id}`);
  };

  return {
    title,
    dateTime,
    lastMessage,
    unseenMessagesCount,
    isLastMessageOutgoing,
    isCurrentlyOpenedChat,
    lastMessageStatus,
    deleteChat,
    handleClick,
  };
};

export default useChatItem;
