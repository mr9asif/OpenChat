import MarkdownRenderer from "@/components/markdown/MarkDownRender";
import type { Message } from "@/utils/chat";
import AssistantAvatar from "../avater/AssistantAvater";
import MessageActions from "./MessageActions";

type Props = {
  message: Message;
};

const AssistantMessage = ({ message }: Props) => {
  return (
    <div className="flex justify-start">
      <AssistantAvatar />
      <div className="max-w-[80%] rounded-3xl px-1 py-3">
        <MarkdownRenderer content={message.content} />
        <MessageActions />
      </div>
    </div>
  );
};

export default AssistantMessage;
