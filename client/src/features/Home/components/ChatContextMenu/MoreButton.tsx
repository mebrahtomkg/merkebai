import { MoreIcon } from '@/components/icons';
import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

const MoreButtonStyled = styled.button`
  position: absolute;
  right: 1rem;
  display: block;
  width: 2.3rem;
  aspect-ratio: 1/1;
  padding: 0.7rem;
  background-color: var(--bg-hover-hover);
  border-radius: 50%;
`;

interface MoreButtonProps {
  onClick: MouseEventHandler;
}

const MoreButton: FC<MoreButtonProps> = ({ onClick }) => {
  return (
    <MoreButtonStyled type="button" onClick={onClick}>
      <MoreIcon />
    </MoreButtonStyled>
  );
};

export default MoreButton;
