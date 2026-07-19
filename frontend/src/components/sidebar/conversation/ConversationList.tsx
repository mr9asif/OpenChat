import { conversations } from "../data/conversation";
import ConversationGroup from "./ConversationGroup";

const groups = ["Today", "Yesterday", "Previous 7 Days"] as const;

const ConversationList = () => {
  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const items = conversations.filter(
          (conversation) => conversation.group === group,
        );

        if (items.length === 0) return null;

        return (
          <ConversationGroup key={group} title={group} conversations={items} />
        );
      })}
    </div>
  );
};

export default ConversationList;
