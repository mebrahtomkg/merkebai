import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';
import handleSocketError from '@/socket/handleSocketError';
import { markMessageAsRead } from '@/services';

interface MessageMarkAsReadPayload {
  chatId: number;
  messageId: number;
}

const handleMessageMarkAsRead = async (
  socket: AuthenticatedSocket,
  payload: MessageMarkAsReadPayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message mark as read payload.',
      });
    }

    const userId = socket.userId as number;

    const { chatId, messageId } = payload;

    if (typeof chatId !== 'string' || !chatId) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat id.',
      });
    }

    if (!isPositiveInteger(messageId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message id.',
      });
    }

    const { unseenMessagesCount } = await markMessageAsRead({
      userId,
      chatId,
      messageId,
    });

    acknowledgement({
      status: 'ok',
      data: { unseenMessagesCount },
      message: 'Message marked as read successfully.',
    });
  } catch (error) {
    handleSocketError(error as Error, acknowledgement);
  }
};

export default handleMessageMarkAsRead;
