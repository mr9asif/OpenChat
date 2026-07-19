import type { Message } from "@/utils/chat";

export const messages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! 👋 How can I help you today?",
    createdAt: new Date(),
  },
  {
    id: "2",
    role: "user",
    content: "Explain React Query in simple words.",
    createdAt: new Date(),
  },
  {
    id: "3",
    role: "assistant",
    content: `
# React Query

React Query helps you manage **server state**.

## Features

- Caching
- Background Refetching
- Pagination
- Mutations

\`\`\`tsx
const { data } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
\`\`\`

| Feature | Supported |
|---------|-----------|
| Cache | ✅ |
| Retry | ✅ |
| Infinite Query | ✅ |
`,
    createdAt: new Date(),
  },
];
