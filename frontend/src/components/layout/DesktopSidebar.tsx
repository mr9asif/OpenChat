import Sidebar from "@/components/sidebar/Sidebar";

const DesktopSidebar = () => {
  return (
    <aside className="hidden md:flex w-72 border-r">
      <Sidebar />
    </aside>
  );
};

export default DesktopSidebar;
