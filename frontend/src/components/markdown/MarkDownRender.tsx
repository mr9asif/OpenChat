import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import markdownComponents from "./MarkDownComponent";

type Props = {
  content: string;
};

const MarkdownRenderer = ({ content }: Props) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
