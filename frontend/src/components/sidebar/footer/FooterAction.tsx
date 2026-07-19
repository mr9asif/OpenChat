import { PreferencesDialog } from "@/components/setting";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { useState } from "react";

const FooterActions = () => {
  const [openPreferences, setOpenPreferences] = useState(false);

  const handlePreferences = () => {
    setOpenPreferences(true);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button
            className="
            rounded-md
            p-2
            transition
            hover:bg-accent
          "
          >
            <Settings className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem onClick={handlePreferences}>
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PreferencesDialog
        open={openPreferences}
        onOpenChange={setOpenPreferences}
      />
    </>
  );
};

export default FooterActions;
