import styled from 'styled-components';
import { MoreIcon } from '../icons';
import { FC, MouseEventHandler } from 'react';

const MoreButtonStyled = styled.button`
  flex-shrink: 0;
  width: 2rem;
  aspect-ratio: 1/1;
  padding: 0.3rem;
`;

interface MoreButtonProps {
  onClick: MouseEventHandler;
  ariaLabel?: string;
}

const MoreButton: FC<MoreButtonProps> = ({ onClick, ...restProps }) => {
  return (
    <MoreButtonStyled aria-label="More" onClick={onClick} {...restProps}>
      <MoreIcon />
    </MoreButtonStyled>
  );
};

export default MoreButton;
