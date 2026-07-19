import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  language: string;
  children: string;
};

const CodeBlock = ({ language, children }: Props) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={{
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
