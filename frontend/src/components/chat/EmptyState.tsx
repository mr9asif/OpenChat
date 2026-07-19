import { Sparkles } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex max-w-xl flex-col items-center px-6 text-center">
      <div className="mb-6 rounded-full border p-4">
        <Sparkles className="h-8 w-8" />
      </div>

      <h1 className="text-3xl font-semibold">How can I help you today?</h1>

      <p className="mt-4 text-muted-foreground">
        Ask anything. I can help you write, code, explain, summarize, translate,
        and much more.
      </p>
    </div>
  );
};

export default EmptyState;
