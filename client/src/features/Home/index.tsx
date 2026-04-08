import {
  ActionButtonsContainer,
  ChatListContainer,
  HeaderContainer,
  HomeStyled,
  NewChatButton,
} from './styles';
import { ChatItem } from './components';
import BottomMenu from './components/BottomMenu';
import { useChats } from '@/hooks';
import { useNavigate } from 'react-router';
import Logo from './components/Logo';

const Home = () => {
  const chats = useChats();

  const navigate = useNavigate();

  const openNewChat = () => {
    navigate(`/chat`);
  };

  return (
    <HomeStyled>
      <HeaderContainer>
        <Logo />
      </HeaderContainer>

      <ActionButtonsContainer>
        <NewChatButton type="button" onClick={openNewChat}>
          New Chat
        </NewChatButton>
      </ActionButtonsContainer>

      <ChatListContainer>
        {chats.map((chat, index) => (
          <ChatItem key={`${chat.id}`} chat={chat} index={index} />
        ))}
      </ChatListContainer>

      <BottomMenu />
    </HomeStyled>
  );
};

export default Home;
