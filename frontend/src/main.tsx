import { TooltipProvider } from "@/components/ui/tooltip";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./app/router/AppRouter.tsx";
import { ChatProvider } from "./context/ChatProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatProvider>
      <TooltipProvider>
        <AppRouter />
      </TooltipProvider>
    </ChatProvider>
  </StrictMode>,
);
