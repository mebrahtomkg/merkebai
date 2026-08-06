import styled from 'styled-components';

export const ChatStyled = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;
  border-color: var(--bg-hover-hover);
  background-color: var(--bg-secondary);
  color: var(--fg-secondary);
`;

export const ChatMessagesListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--bg-scrollbar-thumb);
  }
`;

export const ChatMessagesList = styled.div`
  flex-grow: 1;
  max-width: 36.5rem;
  overflow: hidden;
  margin-top: auto;
  padding: 0 1rem;
`;

// Setting padding-bottom wasnt creating padding at the end of messages list
// This component is created to give gap.
export const Gap = styled.div`
  height: 4rem;
  width: 100%;
  background-color: transparent;
`;

export const ChatFooter = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 0.2rem;
  padding-bottom: 1.4rem;
  padding-left: 0.3rem;
  padding-right: 0.2rem;
  background-color: inherit;
`;

export const IntroText = styled.h3`
  text-align: center;
  width: 100%;
  margin-bottom: 3rem;
  font-size: 2rem;
`;
