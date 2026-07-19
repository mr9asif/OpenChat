import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Archive, Pencil, Pin, Trash2 } from "lucide-react";

const ConversationMenu = () => {
  return (
    <DropdownMenuContent align="end" className="w-52">
      <DropdownMenuItem>
        <Pencil className="mr-2 h-4 w-4" />
        Rename
      </DropdownMenuItem>

      <DropdownMenuItem>
        <Pin className="mr-2 h-4 w-4" />
        Pin
      </DropdownMenuItem>

      <DropdownMenuItem>
        <Archive className="mr-2 h-4 w-4" />
        Archive
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="text-red-500 focus:text-red-500">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default ConversationMenu;
