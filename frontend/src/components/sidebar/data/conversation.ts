export interface Conversation {
  id: string;
  title: string;
  group: "Today" | "Yesterday" | "Previous 7 Days";
}

export const conversations: Conversation[] = [
  {
    id: "1",
    title: "React Authentication",
    group: "Today",
  },
  {
    id: "2",
    title: "Prisma Error Fix",
    group: "Today",
  },
  {
    id: "3",
    title: "Docker Setup",
    group: "Yesterday",
  },
  {
    id: "4",
    title: "Node Interview",
    group: "Yesterday",
  },
  {
    id: "5",
    title: "ChatGPT Clone",
    group: "Previous 7 Days",
  },
  {
    id: "6",
    title: "ChatGPT Clone",
    group: "Previous 7 Days",
  },
  {
    id: "7",
    title: "ChatGPT Clone",
    group: "Previous 7 Days",
  },
];
