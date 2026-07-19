import { messages } from "../data/message";
import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";

const MessageList = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 py-8">
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AssistantMessage key={message.id} message={message} />
        ),
      )}
    </div>
  );
};

export default MessageList;
