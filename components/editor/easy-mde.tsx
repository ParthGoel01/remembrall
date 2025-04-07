"use client";

import { useEasyMDE } from "@/hooks/use-easy-mde";
import { Button } from "../ui/button";

export const CustomEasyMDE = ({
  onSubmit,
}: {
  onSubmit: (data: string) => void;
}) => {
  const { textareaRef, data } = useEasyMDE();
  return (
    <div className="max-w-prose">
      <textarea ref={textareaRef} />
      <Button
        onClick={() => {
          onSubmit(data);
        }}
      >
        Submit
      </Button>
    </div>
  );
};
