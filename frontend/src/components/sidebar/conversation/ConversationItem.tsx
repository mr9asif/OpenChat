import type { Conversation } from "../data/conversation";
import ConversationActions from "./ConversationAction";

interface Props {
  conversation: Conversation;
}

const ConversationItem = ({ conversation }: Props) => {
  return (
    <div
      className="
        group
        flex
        cursor-pointer
        items-center
        justify-between
        rounded-lg
        px-3
        py-2
        transition-colors
        hover:bg-accent
      "
    >
      <span className="truncate text-sm">{conversation.title}</span>

      <ConversationActions />
    </div>
  );
};

export default ConversationItem;
