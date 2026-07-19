import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <aside className="flex h-full w-72 flex-col border-r bg-background">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
