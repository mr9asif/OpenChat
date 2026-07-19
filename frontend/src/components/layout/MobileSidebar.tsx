import { Sheet, SheetContent } from "@/components/ui/sheet";

import Sidebar from "../sidebar/Sidebar";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileSidebar = ({ open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
