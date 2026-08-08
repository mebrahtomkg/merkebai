import { MoreIcon } from '@/components/icons';
import { FC, MouseEventHandler } from 'react';
import { MoreButtonStyled } from './styles';
import { useIsMobile } from '@/hooks';

interface MoreButtonProps {
  onClick: MouseEventHandler;
}

const MoreButton: FC<MoreButtonProps> = ({ onClick }) => {
  const isMobile = useIsMobile();

  return (
    <MoreButtonStyled type="button" onClick={onClick} $isMobile={isMobile}>
      <MoreIcon />
    </MoreButtonStyled>
  );
};

export default MoreButton;
