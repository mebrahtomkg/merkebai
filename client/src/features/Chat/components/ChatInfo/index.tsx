import { FC } from 'react';
import { Name, NameContainer, ProfileLink, UserContainer } from './styles';
import { Chat } from '@/types';
import Avatar from '@/components/Avatar';

interface ChatInfoProps {
  chat: Chat;
}

const ChatInfo: FC<ChatInfoProps> = ({ chat }) => {
  return (
    <ProfileLink role="button">
      <UserContainer>
        <Avatar initials={'GM'} isSmall={true} />

        <NameContainer>
          <Name>{'Gemini-3-pro'}</Name>
        </NameContainer>
      </UserContainer>
    </ProfileLink>
  );
};

export default ChatInfo;
