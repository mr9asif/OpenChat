import { Info, MessageSquare, Palette, Type, User } from "lucide-react";

export type SettingsTab =
  "profile" | "appearance" | "chat" | "typography" | "about";

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const items = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
  },
  {
    id: "typography",
    label: "Typography",
    icon: Type,
  },
  {
    id: "about",
    label: "About",
    icon: Info,
  },
] satisfies {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
}[];

const SettingsSidebar = ({ activeTab, onTabChange }: SettingsSidebarProps) => {
  return (
    <aside className="w-44 shrink-0 border-r p-3">
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                activeTab === item.id
                  ? "bg-accent font-medium"
                  : "hover:bg-accent/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
