import type { Message } from "@/utils/chat";

type Props = {
  message: Message;
};

const MessageBubble = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
