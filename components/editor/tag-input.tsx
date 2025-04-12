"use client";

import { BadgePlus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";

export const TagInput = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const tagRef = useRef<HTMLInputElement | null>(null);
  const [isTagValid, setIsTagValid] = useState<boolean>(false);
  const addTag = () => {
    const value = tagRef.current!.value.trim().toLowerCase();
    if (
      value.length === 0 ||
      tags.includes(value) ||
      !/^[a-zA-Z0-9]+$/.test(value) ||
      value.length >= 20 ||
      value.length < 3
    ) {
      setIsTagValid(false);
      tagRef.current!.focus();
      return;
    }
    setTags((prev) => {
      return [...prev, value];
    });
    tagRef.current!.value = "";
    setIsTagValid(false);
    tagRef.current!.focus();
  };
  return (
    <div>
      <div className="flex gap-1">
        <Input
          placeholder="Add tags"
          className="grow inline-block"
          ref={tagRef}
          onChange={(e) => {
            const value = e.target.value.trim().toLowerCase();
            setIsTagValid(
              value.trim().length > 0 &&
                !tags.includes(value) &&
                /^[a-zA-Z0-9]+$/.test(value) &&
                value.length < 20 &&
                value.length >= 3
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isTagValid) {
              addTag();
            }
          }}
        />
        <Button
          variant="outline"
          className="inline-block cursor-pointer"
          disabled={!isTagValid}
          onClick={addTag}
        >
          <BadgePlus />
        </Button>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {tags.length === 0 && (
          <p className="text-sm text-muted-foreground">No tags added yet.</p>
        )}
        {tags.map((tag) => (
          <button
            key={tag}
            className="bg-blue-200 relative group text-blue-800 hover:bg-rose-200 hover:text-rose-800 text-sm font-semibold mr-2 px-2.5 py-1 rounded-lg flex items-center justify-center h-9 cursor-pointer"
            onClick={() => {
              setTags((prev) => {
                return prev.filter((t) => t !== tag);
              });
            }}
          >
            <div className="group-hover:opacity-0 opacity-100">#{tag}</div>
            <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <Trash2 className="size-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
