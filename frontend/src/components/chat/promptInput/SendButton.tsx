import { ArrowUp } from "lucide-react";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const SendButton = ({ disabled, onClick }: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition disabled:opacity-50"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default SendButton;
