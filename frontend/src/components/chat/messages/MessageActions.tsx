import { Copy, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";

const MessageActions = () => {
  return (
    <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
      <button className="rounded-md p-2 hover:bg-muted">
        <Copy className="h-4 w-4" />
      </button>

      <button className="rounded-md p-2 hover:bg-muted">
        <RotateCcw className="h-4 w-4" />
      </button>

      <button className="rounded-md p-2 hover:bg-muted">
        <ThumbsUp className="h-4 w-4" />
      </button>

      <button className="rounded-md p-2 hover:bg-muted">
        <ThumbsDown className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MessageActions;
