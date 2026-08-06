import styled, { css } from 'styled-components';

export const SidebarOverlay = styled.div<{ $isMobile: boolean }>`
  ${(props) =>
    props.$isMobile
      ? css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 3;
          background-color: rgb(0 0 0 / 28%);
        `
      : css``}
`;

export const SidebarStyled = styled.div<{ $isMobile: boolean }>`
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-primary);
  border-right: 1px solid;
  border-color: var(--fg-border);

  ${(props) =>
    props.$isMobile
      ? css`
          width: 85vw;
          min-width: 85vw;
        `
      : css`
          width: var(--big-modal-width);
          min-width: var(--big-modal-width);
        `}
`;

export const HeaderContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
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
