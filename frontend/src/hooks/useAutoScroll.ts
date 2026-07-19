import { useEffect, useRef } from "react";

const useAutoScroll = <T>(dependency: T) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [dependency]);

  return bottomRef;
};

export default useAutoScroll;
