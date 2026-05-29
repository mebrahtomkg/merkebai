import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import { Chat, Message } from '@/types';
import queryClient from './queryClient';

const setCache = (setterFn: (chats: Chat[]) => Chat[]) => {
  queryClient.setQueryData<Chat[]>([QUERY_KEY_CHATS], (chats) =>
    setterFn(chats || []),
  );
};

const chatsCache = {
  add: (chat: Chat) => {
    setCache((chats) => [...chats, chat]);
  },

  update: (chat: Chat) => {
    setCache((chats: Chat[]) =>
      chats.map((oldChat) => (oldChat.id === chat.id ? chat : oldChat)),
    );
  },

  remove: (chatId: string) => {
    setCache((chats: Chat[]) => chats.filter((chat) => chat.id !== chatId));
  },

  incrementChatUnseenMessagesCount: (chatId: string) => {
    setCache((chats) =>
      chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              unseenMessagesCount: (chat.unseenMessagesCount || 0) + 1,
            }
          : chat,
      ),
    );
  },

  updateChatLastMessage: (chatId: string) => {
    const messages = queryClient.getQueryData<Message[]>([
      QUERY_KEY_MESSAGES,
      chatId,
    ]);

    const lastMessage =
      messages && messages.length > 0
        ? messages[messages.length - 1]
        : undefined;

    setCache((chats) =>
      chats.map((chat) =>
        chat.id === chatId ? { ...chat, lastMessage } : chat,
      ),
    );
  },

  setChatUnseenMessagesCount: (chatId: string, unseenMessagesCount: number) => {
    setCache((chats) =>
      chats.map((chat) =>
        chat.id === chatId ? { ...chat, unseenMessagesCount } : chat,
      ),
    );
  },

  getChat: (chatId: string) => {
    return queryClient
      .getQueryData<Chat[]>([QUERY_KEY_CHATS])
      ?.find((chat) => chat.id === chatId);
  },

  getAllChats: (): Chat[] =>
    queryClient.getQueryData<Chat[]>([QUERY_KEY_CHATS]) || [],
};

export default chatsCache;
