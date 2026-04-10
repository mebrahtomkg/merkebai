import { FC } from 'react';
import Markdown from 'react-markdown';
import {
  AiContentStyled,
  MdA,
  MdCode,
  MdH1,
  MdH2,
  MdH3,
  MdH4,
  MdH5,
  MdH6,
  MdP,
  MdPre,
  MdStrong,
  MdUl,
  MdOl,
  MdLi,
  MdBlockquote,
  MdHr,
  MdEm,
  MdTable,
  MdThead,
  MdTr,
  MdTh,
  MdTd,
  MdImg,
} from './styles';
import remarkGfm from 'remark-gfm';

interface AiContentProps {
  markdown: string;
}

const AiContent: FC<AiContentProps> = ({ markdown }) => {
  return (
    <AiContentStyled>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: MdH1,
          h2: MdH2,
          h3: MdH3,
          h4: MdH4,
          h5: MdH5,
          h6: MdH6,
          a: MdA,
          p: MdP,
          strong: MdStrong,
          em: MdEm,
          ul: MdUl,
          ol: MdOl,
          li: MdLi,
          blockquote: MdBlockquote,
          hr: MdHr,
          table: MdTable,
          thead: MdThead,
          tr: MdTr,
          th: MdTh,
          td: MdTd,
          img: MdImg,
          pre: MdPre,
          code: ({ node, className, children, ...props }) => (
            <MdCode $isInline={!className} {...props}>
              {children}
            </MdCode>
          ),
        }}
      >
        {markdown}
      </Markdown>
    </AiContentStyled>
  );
};

export default AiContent;
