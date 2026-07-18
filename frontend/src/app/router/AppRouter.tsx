import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import RootLayout from "@/components/layout/RootLayout";
import ChatPage from "@/pages/chat/ChatPage";
import NotFoundPage from "@/pages/notFound/NotFound";
import SettingsPage from "@/pages/setting/SettingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <ChatPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
