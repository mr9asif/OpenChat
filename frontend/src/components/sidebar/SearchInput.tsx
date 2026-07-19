import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <input
        type="text"
        placeholder="Search conversations..."
        className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default SearchInput;
