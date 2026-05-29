import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { deleteChat } from '@/services';
import { ChatDeleteError } from '@/services/deleteChat';
import handleSocketError from '@/socket/handleSocketError';

interface ChatDeletePayload {
  chatId: string;
}

const handleChatDelete = async (
  socket: AuthenticatedSocket,
  payload: ChatDeletePayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat delete payload.',
      });
    }

    const userId = socket.userId as number;
    const { chatId } = payload;

    if (typeof chatId !== 'string' || !chatId) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat partner id.',
      });
    }

    await deleteChat({
      userId,
      chatId,
    });

    acknowledgement({
      status: 'ok',
      message: 'Chat deleted successfully.',
    });
  } catch (error) {
    if (error instanceof ChatDeleteError) {
      acknowledgement({
        status: 'error',
        message: error.message,
      });
    } else {
      handleSocketError(error as Error, acknowledgement);
    }
  }
};

export default handleChatDelete;
