import { useState } from "react";

import AutoResizeTextarea from "./AutoResizeTextArea";
import SendButton from "./SendButton";

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    console.log(prompt);

    setPrompt("");
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-3xl border p-3">
        <AutoResizeTextarea
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
        />

        <SendButton disabled={!prompt.trim()} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default PromptInput;
