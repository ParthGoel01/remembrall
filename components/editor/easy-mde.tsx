"use client";

import { useEasyMDE } from "@/hooks/use-easy-mde";

export const CustomEasyMDE = ({
  setData,
  className,
}: {
  setData: (data: string) => void;
  className?: string;
}) => {
  const { textareaRef } = useEasyMDE({ setData });
  return <textarea className={className} ref={textareaRef} />;
};
