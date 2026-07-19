import { Bot } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const AssistantAvatar = () => {
  return (
    <Avatar className="size-8 shrink-0">
      <AvatarFallback className="bg-foreground text-background">
        <Bot className="size-4" />
      </AvatarFallback>
    </Avatar>
  );
};

export default AssistantAvatar;
