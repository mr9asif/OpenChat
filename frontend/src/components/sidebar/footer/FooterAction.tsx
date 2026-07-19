import { Settings } from "lucide-react";

const FooterActions = () => {
  return (
    <button
      className="
      rounded-md
      p-2
      transition
      hover:bg-accent
      "
    >
      <Settings className="h-4 w-4" />
    </button>
  );
};

export default FooterActions;
