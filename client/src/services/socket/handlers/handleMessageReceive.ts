import { messagesCache } from '@/queryClient';
import { Message } from '@/types';

interface MessageReceivePayload {
  message: Message;
}

const handleMessageReceive = ({ message }: MessageReceivePayload) => {
  messagesCache.add(message);
};

export default handleMessageReceive;
