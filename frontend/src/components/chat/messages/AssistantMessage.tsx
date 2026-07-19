import MarkdownRenderer from "@/components/markdown/MarkDownRender";
import type { Message } from "@/utils/chat";

type Props = {
  message: Message;
};

const AssistantMessage = ({ message }: Props) => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-3xl px-1 py-3">
        <MarkdownRenderer content={message.content} />
      </div>
    </div>
  );
};

export default AssistantMessage;
