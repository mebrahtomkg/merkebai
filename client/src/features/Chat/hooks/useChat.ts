import { useMemo } from 'react';
import { useChats } from '@/hooks';

const useChat = (chatId: number) => {
  const chats = useChats();

  const chat = useMemo(
    () => chats.find((chat) => chat.id === chatId),
    [chats, chatId],
  );

  return chat;
};

export default useChat;
