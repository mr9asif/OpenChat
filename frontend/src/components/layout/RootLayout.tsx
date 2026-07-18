import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Outlet />
    </main>
  );
};

export default RootLayout;
