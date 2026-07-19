import ChatContainer from "./ChatContainer";
import PromptInput from "./promptInput/PromptInput";

const ChatLayout = () => {
  return (
    <section className="flex h-full flex-col bg-background">
      <ChatContainer />

      <PromptInput />
    </section>
  );
};

export default ChatLayout;
