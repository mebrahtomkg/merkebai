import { useMemo } from 'react';
import { useChats } from '@/hooks';

const useChat = (chatId?: string) => {
  const chats = useChats();

  const chat = useMemo(
    () => (chatId ? chats.find((chat) => chat.id === chatId) : undefined),
    [chats, chatId],
  );

  return chat;
};

export default useChat;
