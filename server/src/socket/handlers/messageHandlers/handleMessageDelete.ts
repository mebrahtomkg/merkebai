import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';
import { deleteMessage } from '@/services';
import { MessageDeleteError } from '@/services/deleteMessage';
import handleSocketError from '@/socket/handleSocketError';

interface MessageDeletePayload {
  messageId: number;
}

const handleMessageDelete = async (
  socket: AuthenticatedSocket,
  payload: MessageDeletePayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message delete payload.',
      });
    }

    const userId = socket.userId as number;

    const { messageId } = payload;

    if (!isPositiveInteger(messageId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message id.',
      });
    }

    await deleteMessage({
      userId,
      messageId,
    });

    acknowledgement({
      status: 'ok',
      message: 'Message deleted successfully.',
    });
  } catch (err) {
    if (err instanceof MessageDeleteError) {
      acknowledgement({
        status: 'error',
        message: err.message,
      });
    } else {
      handleSocketError(err as Error, acknowledgement);
    }
  }
};

export default handleMessageDelete;
