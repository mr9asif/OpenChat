import { useState } from "react";
import { Outlet } from "react-router-dom";

import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import TopBar from "./TopBar";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DesktopSidebar />

      <MobileSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
