import type { Components } from "react-markdown";
import CodeBlock from "./CodeBlock";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-8 text-3xl font-bold tracking-tight">{children}</h1>
  ),

  h2: ({ children }) => (
    <h2 className="mb-4 mt-8 text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mb-3 mt-6 text-xl font-semibold">{children}</h3>
  ),

  p: ({ children }) => (
    <p className="leading-7 text-foreground/90 mb-4">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),

  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden border">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,

  th: ({ children }) => (
    <th className="border px-4 py-2 text-left font-semibold">{children}</th>
  ),

  td: ({ children }) => <td className="border px-4 py-2">{children}</td>,

  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-4 hover:opacity-80"
    >
      {children}
    </a>
  ),

  code({ className, children }) {
    const match = /language-(\w+)/.exec(className || "");

    if (!match) {
      return (
        <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
          {children}
        </code>
      );
    }

    return <CodeBlock language={match[1]}>{String(children).trim()}</CodeBlock>;
  },
};

export default markdownComponents;
