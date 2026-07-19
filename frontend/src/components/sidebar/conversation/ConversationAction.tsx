import { MoreHorizontal } from "lucide-react";

const ConversationActions = () => {
  return (
    <button
      className="
      opacity-0
      transition-opacity
      group-hover:opacity-100
      rounded-md
      p-1
      hover:bg-muted
      "
    >
      <MoreHorizontal className="h-4 w-4" />
    </button>
  );
};

export default ConversationActions;
