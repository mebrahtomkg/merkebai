import styled from 'styled-components';

export const HomeStyled = styled.div`
  position: relative;
  height: 100vh;
  width: var(--big-modal-width);
  min-width: var(--big-modal-width);
  overflow: hidden;
  background-color: var(--bg-primary);
  border-right: 1px solid;
  border-color: var(--fg-border);
`;

export const HeaderContainer = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatListContainer = styled.div`
  height: 100vh;
  padding-bottom: calc(var(--bottom-menu-height) + 6rem);
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--bg-scrollbar-thumb);
  }
`;

export const MenuButton = styled.button`
  margin-right: 0.5rem;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.4rem;
`;
