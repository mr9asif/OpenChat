import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const UserAvatar = () => {
  return (
    <Avatar className="size-8 shrink-0">
      <AvatarFallback>
        <User className="size-4" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
