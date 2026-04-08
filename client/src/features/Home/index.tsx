import { ChatListContainer, HeaderContainer, HomeStyled } from './styles';
import { ChatItem } from './components';
import BottomMenu from './components/BottomMenu';
import { useChats } from '@/hooks';
import Logo from './components/Logo';

const Home = () => {
  const chats = useChats();

  return (
    <HomeStyled>
      <HeaderContainer>
        <Logo />
      </HeaderContainer>

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
