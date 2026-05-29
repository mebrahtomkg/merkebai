import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import { Chat, Message } from '@/types';
import queryClient from './queryClient';
import accountCache from './accountCache';
import chatsCache from './chatsCache';

const setCache = (
  chatId: string,
  setterFn: (messages: Message[]) => Message[],
) => {
  queryClient.setQueryData<Message[]>(
    [QUERY_KEY_MESSAGES, chatId],
    (oldMessages) => {
      const messages = setterFn(oldMessages || []);

      // Update last message of the target chat.
      queryClient.setQueryData<Chat[]>([QUERY_KEY_CHATS], (chats) =>
        chats?.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                lastMessage: messages[messages.length - 1],
              }
            : chat,
        ),
      );

      return messages;
    },
  );
};

const messagesCache = {
  add: (message: Message) => {
    const { chatId } = message;
    const chatExists = !!chatsCache.getChat(chatId);

    if (message.isAiMessage && chatExists) {
      chatsCache.incrementChatUnseenMessagesCount(chatId);
    }

    if (!chatExists) {
      chatsCache.add({
        id: message.chatId,
        title: 'New chat',
        lastMessage: message,
        unseenMessagesCount: message.isAiMessage ? 1 : 0,
      });
    }

    setCache(chatId, (messages: Message[]) => [...messages, message]);
  },

  update: (message: Message) => {
    setCache(message.chatId, (messages: Message[]) =>
      messages.map((oldMessage) =>
        oldMessage.id === message.id ? message : oldMessage,
      ),
    );
  },

  remove: (chatId: string, messageId: number) => {
    setCache(chatId, (messages: Message[]) =>
      messages.filter((message) => message.id !== messageId),
    );
  },

  markAsRead: (chatId: string, messageId: number) => {
    setCache(chatId, (messages: Message[]) =>
      messages.map((message) =>
        message.id <= messageId && !message.isSeen
          ? { ...message, isSeen: true }
          : message,
      ),
    );
  },
};

export default messagesCache;
