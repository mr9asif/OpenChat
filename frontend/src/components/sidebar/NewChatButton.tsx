import { Plus } from "lucide-react";

import { useChat } from "@/hooks/useChat";

const NewChatButton = () => {
  const { clearChat } = useChat();

  const handleNewChat = () => {
    clearChat();
  };

  return (
    <button
      onClick={handleNewChat}
      className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
    >
      <Plus className="h-4 w-4" />
      <span>New Chat</span>
    </button>
  );
};

export default NewChatButton;
