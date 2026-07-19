import { messages } from "./data/message";
import EmptyState from "./EmptyState";
import MessageList from "./messages/MessageList";

const ChatContainer = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      {messages.length ? (
        <MessageList />
      ) : (
        <div className="flex h-full items-center justify-center">
          <EmptyState />
        </div>
      )}
    </main>
  );
};

export default ChatContainer;
