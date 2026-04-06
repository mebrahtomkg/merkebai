import { useMemo } from 'react';
import { useChats } from '@/hooks';

const useChat = (partnerId: number) => {
  const chats = useChats();

  const chat = useMemo(
    () => chats.find((chat) => chat.id === partnerId),
    [chats, partnerId],
  );

  return chat;
};

export default useChat;
