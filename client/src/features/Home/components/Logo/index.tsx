import { LogoIcon } from '@/components/icons';
import { LogoIconContainer, LogoStyled, LogoText } from './styles';

const Logo = () => {
  return (
    <LogoStyled>
      <LogoIconContainer>
        <LogoIcon />
      </LogoIconContainer>
      <LogoText>MerkebAI</LogoText>
    </LogoStyled>
  );
};

export default Logo;
