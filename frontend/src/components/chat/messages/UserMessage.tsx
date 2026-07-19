import type { Message } from "@/utils/chat";

type Props = {
  message: Message;
};

const UserMessage = ({ message }: Props) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-3xl bg-primary px-5 py-3 text-primary-foreground">
        {message.content}
      </div>
    </div>
  );
};

export default UserMessage;
