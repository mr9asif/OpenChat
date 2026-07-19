import { messages } from "./data/message";
import EmptyState from "./EmptyState";
import MessageList from "./messages/MessageList";

const ChatContainer = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      {messages.length === 0 ? <EmptyState /> : <MessageList />}
    </main>
  );
};

export default ChatContainer;
