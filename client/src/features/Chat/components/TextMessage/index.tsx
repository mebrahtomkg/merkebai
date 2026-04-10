import { FC } from 'react';
import { Content, HiddenMeta, TextMessageStyled, VisibleMeta } from './styles';
import MessageMeta from '../MessageMeta';
import { Message } from '@/types';
import { MessageInfo } from '../../types';
import { useMessageContent } from '../../hooks';
import AiContent from './AiContent';

interface TextMessageProps {
  message: Message;
  messageInfo: MessageInfo;
}

const TextMessage: FC<TextMessageProps> = ({ message, messageInfo }) => {
  const { isOutgoing } = messageInfo;

  const content = useMessageContent(message.id, message.content);

  return (
    <TextMessageStyled $isOutgoing={isOutgoing}>
      {message.isAiMessage ? (
        <AiContent markdown={content as string} />
      ) : (
        <Content>content</Content>
      )}
      <HiddenMeta>
        <MessageMeta message={message} />
      </HiddenMeta>

      <VisibleMeta>
        <MessageMeta message={message} />
      </VisibleMeta>
    </TextMessageStyled>
  );
};

export default TextMessage;
