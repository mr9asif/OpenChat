import ConversationList from "./conversation/ConversationList";
import SearchSection from "./SearchSection";

const SidebarContent = () => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <SearchSection />

      <div
        className="
        flex-1
        overflow-y-auto
        p-4
        "
      >
        <ConversationList />
      </div>
    </div>
  );
};

export default SidebarContent;
