import { Bot } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Bot className="h-5 w-5" />
      </div>

      <div>
        <h1 className="text-lg font-bold">OpenChat</h1>
        <p className="text-xs text-muted-foreground">
          Your intelligent assistant
        </p>
      </div>
    </div>
  );
};

export default Logo;
