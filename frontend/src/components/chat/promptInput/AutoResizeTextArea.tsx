import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const AutoResizeTextarea = ({ value, onChange, onSubmit }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      value={value}
      placeholder="Ask anything..."
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSubmit();
        }
      }}
      className="max-h-52 w-full resize-none bg-transparent outline-none"
    />
  );
};

export default AutoResizeTextarea;
