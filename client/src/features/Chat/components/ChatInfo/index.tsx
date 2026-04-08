import { FC } from 'react';
import { Title, TitleContainer, ChatInfoStyled, UserContainer } from './styles';
import { Chat } from '@/types';

interface ChatInfoProps {
  chat: Chat;
}

const ChatInfo: FC<ChatInfoProps> = ({ chat }) => {
  return (
    <ChatInfoStyled>
      <UserContainer>
        <TitleContainer>
          <Title>Title of chat</Title>
        </TitleContainer>
      </UserContainer>
    </ChatInfoStyled>
  );
};

export default ChatInfo;
