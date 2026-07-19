import { Menu } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: Props) => {
  return (
    <header
      className="
        flex
        h-14
        items-center
        justify-between
        border-b
        px-4
        md:hidden
      "
    >
      <button onClick={onMenuClick} className="rounded-md p-2 hover:bg-accent">
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="font-semibold">OpenChat</h1>

      <div className="w-9" />
    </header>
  );
};

export default TopBar;
