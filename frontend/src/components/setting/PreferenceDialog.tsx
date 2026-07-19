import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SettingsSidebar, { type SettingsTab } from "./SettingsSidebar";

import AboutSection from "./AboutSection";
import AppearanceSection from "./AppearenceSection";
import ChatSection from "./ChatSection";
import ProfileSection from "./ProfileSection";
import TypographySection from "./TypographySection";

interface PreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PreferencesDialog = ({ open, onOpenChange }: PreferencesDialogProps) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;

      case "appearance":
        return <AppearanceSection />;

      case "chat":
        return <ChatSection />;

      case "typography":
        return <TypographySection />;

      case "about":
        return <AboutSection />;

      default:
        return <ProfileSection />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-7xl h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Preferences</DialogTitle>
        </DialogHeader>

        <div className="flex h-[600px]">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesDialog;
