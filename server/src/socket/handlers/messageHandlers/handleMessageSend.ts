import { isPositiveInteger } from '@/utils';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { emitToUser } from '@/socket/emitter';
import { sendMessage } from '@/services';
import { MessageSendError } from '@/services/sendMessage';
import handleSocketError from '@/socket/handleSocketError';

interface MessageSendPayload {
  content: string;
  chatId?: number;
}

const handleMessageSend = async (
  socket: AuthenticatedSocket,
  payload: MessageSendPayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message send payload.',
      });
    }

    const { content, chatId } = payload;

    const userId = socket.userId as number;

    if (typeof content !== 'string') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message content.',
      });
    }

    // if (chatId !== undefined && !isPositiveInteger(chatId)) {
    //   return acknowledgement({
    //     status: 'error',
    //     message: 'Invalid chat id.',
    //   });
    // }

    const { message } = await sendMessage({
      messageType: 'text',
      userId,
      content,
      chatId,
    });

    acknowledgement({
      status: 'ok',
      message: 'Message sent successfully!',
      data: message,
    });

    // emitToUser(receiverId, 'message_received', { message });
  } catch (err) {
    if (err instanceof MessageSendError) {
      acknowledgement({
        status: 'error',
        message: err.message,
      });
    } else {
      handleSocketError(err as Error, acknowledgement);
    }
  }
};

export default handleMessageSend;
