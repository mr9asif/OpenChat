import Logo from "./Logo";
import NewChatButton from "./NewChatButton";

const SidebarHeader = () => {
  return (
    <div className="space-y-4 border-b p-4">
      <Logo />
      <NewChatButton />
    </div>
  );
};

export default SidebarHeader;
