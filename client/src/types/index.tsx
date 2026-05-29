declare global {
  interface Window {
    IS_PRODUCTION: boolean;
    API_URL: string;
    SERVICE_WORKER_URL: string;
  }
}

export type Theme = 'dark' | 'light';

export type VisibilityOption = 'everybody' | 'contacts' | 'nobody';

export type MessageType = 'text' | 'photo' | 'audio' | 'video' | 'file';

export interface Account {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Attachment {
  id: number;
  name: string;
  size: number;
  width: number | null | undefined;
  height: number | null | undefined;
  caption: string | null | undefined;
  file?: File; // Only exists on frontend
}

export interface Message {
  id: number;
  isAiMessage?: boolean;
  chatId: string;
  content: string | null;
  isSeen: boolean;
  createdAt: number;
  editedAt: number;
  attachment?: Attachment;
}

export interface Chat {
  id: string;
  title?: string;
  lastMessage?: Message;
  unseenMessagesCount?: number;
}

interface BaseMessageRequest {
  requestId: number;
  requestType:
    | 'TEXT_MESSAGE_SEND'
    | 'FILE_MESSAGE_SEND'
    | 'MESSAGE_UPDATE'
    | 'MESSAGE_DELETE'
    | 'CHAT_DELETE'
    | 'MESSAGE_MARK_AS_READ';
  payload: object;
}

export interface TextMessageSendRequest extends BaseMessageRequest {
  requestType: 'TEXT_MESSAGE_SEND';
  timestamp: number;
  payload: {
    content: string;
    chatId?: string;
  };
}

export interface FileMessageSendRequest extends BaseMessageRequest {
  requestType: 'FILE_MESSAGE_SEND';
  timestamp: number;
  payload: {
    fileId: number;
    chatId?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

export interface MessageUpdateRequest extends BaseMessageRequest {
  requestType: 'MESSAGE_UPDATE';
  payload: {
    messageId: number;
    newContent: string;
  };
}

export interface MessageDeleteRequest extends BaseMessageRequest {
  requestType: 'MESSAGE_DELETE';
  payload: {
    message: Message;
    deleteForReceiver?: boolean;
  };
}

export interface ChatDeleteRequest extends BaseMessageRequest {
  requestType: 'CHAT_DELETE';
  payload: {
    chatId: string;
  };
}

export interface MessageMarkAsReadRequest extends BaseMessageRequest {
  requestType: 'MESSAGE_MARK_AS_READ';
  payload: {
    chatPartnerId: number;
    messageId: number;
  };
}

export type MessageRequest =
  | TextMessageSendRequest
  | FileMessageSendRequest
  | MessageUpdateRequest
  | MessageDeleteRequest
  | ChatDeleteRequest
  | MessageMarkAsReadRequest;
