import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ConversationMenu from "./ConversationMenu";

const ConversationActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          opacity-0
          transition-opacity
          group-hover:opacity-100
          rounded-md
          p-1
          hover:bg-accent
        "
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <ConversationMenu />
    </DropdownMenu>
  );
};

export default ConversationActions;
