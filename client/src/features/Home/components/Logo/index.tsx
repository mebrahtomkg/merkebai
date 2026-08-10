import { LogoIcon } from '@/components/icons';
import { LogoIconContainer, LogoStyled, LogoText } from './styles';
import { useAppStateStore } from '@/store';
import { useNavigate } from 'react-router';
import { MouseEventHandler } from 'react';
import { useIsMobile } from '@/hooks';

const Logo = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const closeSidebar = useAppStateStore((state) => state.closeSidebar);

  const handleClick: MouseEventHandler = (e) => {
    if (!isMobile) return;

    e.preventDefault();

    closeSidebar();

    // Set delay to make work on low tier devices.
    // We must not clean timout on unmount, because we wanna happen url change after
    // sidebar is hidden(unmounted).
    setTimeout(() => navigate('/'), 300);
  };

  return (
    <LogoStyled to="/" onClick={handleClick}>
      <LogoIconContainer>
        <LogoIcon />
      </LogoIconContainer>
      <LogoText>MerkebAI</LogoText>
    </LogoStyled>
  );
};

export default Logo;
