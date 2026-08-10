import { FC } from 'react';
import styled from 'styled-components';
import { MenuIcon } from '@/components/icons';

const SidebarButtonStyled = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.65rem;
  border: 1px solid;
  background-color: var(--bg-hover);
  border-color: var(--fg-border);
  border-radius: 5px;
  margin: 0.1rem;
`;

interface SidebarButtonProps {
  onClick: () => void;
}

const SidebarButton: FC<SidebarButtonProps> = ({ onClick }) => (
  <SidebarButtonStyled
    type="button"
    aria-label="open-sidebar"
    onClick={onClick}
  >
    <MenuIcon />
  </SidebarButtonStyled>
);

export default SidebarButton;
