import { useQuery } from '@tanstack/react-query';
import { get } from '@/api';
import { Message } from '@/types';
import { QUERY_KEY_MESSAGES } from '@/constants';

const useChatMessages = (chatId: number) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_MESSAGES, chatId],
    queryFn: () => get<Message[]>(`/messages/${chatId}`),
  });

  return data || [];
};

export default useChatMessages;
