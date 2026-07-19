import type { Conversation } from "../data/conversation";
import ConversationActions from "./ConversationAction";

interface Props {
  conversation: Conversation;
}

const ConversationItem = ({ conversation }: Props) => {
  return (
    <button
      className="
      group
      flex
      w-full
      items-center
      justify-between
      rounded-lg
      px-3
      py-2
      transition
      hover:bg-accent
      "
    >
      <span className="truncate text-sm">{conversation.title}</span>

      <ConversationActions />
    </button>
  );
};

export default ConversationItem;
