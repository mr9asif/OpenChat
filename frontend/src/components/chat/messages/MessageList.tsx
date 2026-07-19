import useAutoScroll from "@/hooks/useAutoScroll";
import { useChat } from "@/hooks/useChat";

import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";

const MessageList = () => {
  const { messages, isTyping } = useChat();

  const bottomRef = useAutoScroll(messages);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 py-8">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AssistantMessage key={message.id} message={message} />
        ),
      )}

      {isTyping && (
        <div className="text-sm text-muted-foreground animate-pulse">
          OpenChat is thinking...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
