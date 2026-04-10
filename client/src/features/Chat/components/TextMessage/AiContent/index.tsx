import { FC } from 'react';
import Markdown from 'react-markdown';
import {
  AiContentStyled,
  MdCode,
  MdH1,
  MdH2,
  MdH3,
  MdH4,
  MdP,
  MdPre,
  MdStrong,
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
          p: MdP,
          strong: MdStrong,
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
