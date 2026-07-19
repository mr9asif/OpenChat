import type { Conversation } from "../data/conversation";
import ConversationItem from "./ConversationItem";

interface Props {
  title: string;
  conversations: Conversation[];
}

const ConversationGroup = ({ title, conversations }: Props) => {
  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-semibold uppercase text-muted-foreground">
        {title}
      </h3>

      <div className="space-y-1">
        {conversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};

export default ConversationGroup;
