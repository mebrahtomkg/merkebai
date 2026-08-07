import { Link } from 'react-router';
import styled from 'styled-components';

export const GuestContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-primary);
`;

export const GuestStyled = styled.div`
  min-height: 100vh;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormStyled = styled.div`
  width: 19rem;
  border: 1px solid;
  border-color: var(--fg-border);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  padding: 1.8rem;
  background-color: var(--bg-primary);

  @media (min-width: 375px) {
    width: 20rem;
  }
`;

export const FormTitle = styled.h2`
  width: 100%;
  margin-bottom: 1.8rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--fg-primary);
`;

export const FormLinkContainer = styled.div`
  margin-top: 1.7rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormLink = styled(Link)`
  color: var(--fg-action);
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
    color: var(--fg-action-hover);
  }
`;

export const LinkInfo = styled.span`
  display: block;
  margin-right: 0.8rem;
  font-size: 0.95rem;
  color: var(--fg-primary);
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
