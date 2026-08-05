import { Link } from 'react-router';
import styled from 'styled-components';

export const LogoStyled = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--bg-action-hover);
  text-decoration: none;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    color: var(--bg-action-hover);
  }
`;

export const LogoIconContainer = styled.div`
  width: 3.1rem;
  aspect-ratio: 1/1;
  margin-right: 0.5rem;
`;

export const LogoText = styled.span`
  display: block;
  line-height: 1;
  font-size: 1.9rem;
  font-weight: 700;
`;
