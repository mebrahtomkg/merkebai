import {
  ChatListContainer,
  HeaderContainer,
  SidebarStyled,
  SidebarOverlay,
} from './styles';
import { ChatItem } from './components';
import BottomMenu from './components/BottomMenu';
import { useChats, useIsMobile } from '@/hooks';
import Logo from './components/Logo';
import { CSSProperties, FC, MouseEventHandler } from 'react';
import { useAppStateStore } from '@/store';

interface HomeProps {
  animationStyle?: CSSProperties;
}

const Home: FC<HomeProps> = ({ animationStyle }) => {
  const chats = useChats();
  const isMobile = useIsMobile();

  const closeSidebar = useAppStateStore((s) => s.closeSidebar);

  const handleOverlayClick: MouseEventHandler = (e) => {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      closeSidebar();
    }
  };

  return (
    <SidebarOverlay $isMobile={isMobile} onClick={handleOverlayClick}>
      <SidebarStyled $isMobile={isMobile} style={animationStyle}>
        <HeaderContainer>
          <Logo />
        </HeaderContainer>

        <ChatListContainer>
          {chats.map((chat, index) => (
            <ChatItem key={`${chat.id}`} chat={chat} index={index} />
          ))}
        </ChatListContainer>

        <BottomMenu />
      </SidebarStyled>
    </SidebarOverlay>
  );
};

export default Home;
