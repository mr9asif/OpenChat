import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CoppyButton";

type Props = {
  language: string;
  children: string;
};

const CodeBlock = ({ language, children }: Props) => {
  return (
    <div className="my-6 overflow-hidden rounded-xl border bg-[#282c34]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#21252b] px-4 py-2">
        <span className="text-xs font-medium capitalize text-zinc-300">
          {language}
        </span>

        <CopyButton text={children} />
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "16px",
          background: "transparent",
          borderRadius: 0,
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
