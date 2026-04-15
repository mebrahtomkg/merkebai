import { chatsCache } from '@/queryClient';
import { Chat } from '@/types';

const handleChatUpdate = (chat: Chat) => chatsCache.update(chat);

export default handleChatUpdate;
