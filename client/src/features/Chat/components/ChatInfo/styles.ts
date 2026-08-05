import styled, { css } from 'styled-components';

export const ChatInfoStyled = styled.div`
  flex-grow: 2;
  margin-left: 2rem;
  min-width: 0;

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.div`
  min-width: 0;
`;

export const Title = styled.h3`
  min-width: 0;
  color: var(--fg-primary);
  font-size: 1.3rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Status = styled.span<{ $isOnline: boolean }>`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;

  ${(props) =>
    props.$isOnline
      ? css`
          color: var(--fg-user-status);
        `
      : css`
          color: var(--fg-secondary);
        `}
`;
