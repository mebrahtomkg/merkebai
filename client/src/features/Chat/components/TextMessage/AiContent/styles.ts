import styled, { css } from 'styled-components';

export const AiContentStyled = styled.div`
  font-size: 1.032rem;
  font-weight: 500;
  line-height: 1.6;
  color: inherit;
  word-break: break-word;
`;

export const MdH1 = styled.h1`
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.25;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 0.3rem;
`;

export const MdH2 = styled.h2`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
`;

export const MdH3 = styled.h3`
  font-size: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const MdH4 = styled.h4`
  font-size: 1.1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const MdH5 = styled.h5`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const MdH6 = styled.h6`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const MdA = styled.a`
  font-size: 1rem;
  font-weight: 500;
  color: var(--bg-action);

  &:hover {
    color: var(--bg-action-hover);
  }
`;

export const MdP = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 400;
  line-height: 1.6;
  color: inherit;
`;

export const MdStrong = styled.strong`
  font-weight: 600;
  color: inherit;
`;

export const MdPre = styled.pre`
  margin: 1rem 0;
  padding: 0;
  display: block;
`;

export const MdCode = styled.code<{ $isInline: boolean }>`
  ${(props) =>
    props.$isInline
      ? css`
          display: inline-block;
          background-color: var(--bg-page);
          padding: 0rem 0.4rem;
          border-radius: 5px;
          font-family: monospace;
          font-size: 0.93rem;
        `
      : css`
          display: block;
          overflow-x: auto;
          background-color: var(--bg-page);
          padding: 0.5rem;
          border-radius: 5px;
          font-family: monospace;
          font-size: 0.93rem;

          &::-webkit-scrollbar {
            height: 8px;
            background-color: transparent;
          }

          &::-webkit-scrollbar-thumb {
            background-color: var(--bg-scrollbar-thumb);
            border-radius: 10px;
          }

          &::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
`;

export const MdUl = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
  list-style-type: disc;
`;

export const MdOl = styled.ol`
  margin: 1rem 0;
  padding-left: 1.5rem;
  list-style-type: decimal;
`;

export const MdLi = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.6;

  & > ul,
  & > ol {
    margin: 0.5rem 0;
  }
`;

export const MdBlockquote = styled.blockquote`
  margin: 1.5rem 0;
  padding: 0.5rem 1rem;
  border-left: 4px solid var(--bg-action);
  background-color: var(--bg-page);
  color: inherit;
  font-style: italic;
  opacity: 0.9;

  & > p:last-child {
    margin-bottom: 0;
  }
`;

export const MdHr = styled.hr`
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MdEm = styled.em`
  font-style: italic;
`;

export const MdTable = styled.table`
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
  font-size: 0.95rem;
`;

export const MdThead = styled.thead``;

export const MdTr = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const MdTh = styled.th`
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MdTd = styled.td`
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MdImg = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
`;
