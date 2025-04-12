"use client";

import { newPostSchema, NewPostSchema } from "@/app/types/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomEasyMDE } from "../editor/easy-mde";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { TagInput } from "../editor/tag-input";

export const NewPost = () => {
  const form = useForm<NewPostSchema>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      heading: "",
    },
  });

  const [editorData, setEditorData] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const onSubmit = async (data: NewPostSchema) => {
    console.log(editorData);
    console.log(data);
    console.log(tags);
  };

  return (
    <main>
      <div className="flex flex-col gap-4 max-w-prose px-5 mx-auto my-2">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
          Create a new memory
        </h1>
        <Form {...form}>
          <FormField
            control={form.control}
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading</FormLabel>
                <FormControl>
                  <Input placeholder="My memory" {...field} />
                </FormControl>
                <FormDescription>
                  This is the heading of your post. It will be displayed at the
                  top of the post.
                </FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </Form>
        <div>
          <h2 className="text-sm pointer-events-none select-none">Content</h2>
          <div className="mt-2">
            <CustomEasyMDE setData={setEditorData} />
          </div>
        </div>
        <div>
          <h2 className="text-sm pointer-events-none select-none">Tags</h2>
          <div className="mt-2">
            <TagInput tags={tags} setTags={setTags} />
          </div>
        </div>
        <button
          className="cursor-pointer bg-gradient-to-tr from-blue-400 to-blue-800 hover:from-blue-600 hover:to-blue-600 w-fit ml-auto flex gap-1.5 items-center justify-center focus-visible:ring-blue-200 focus-visible:ring-offset-1 group text-white rounded-md px-4 py-2 text-sm font-semibold shadow-sm active:scale-[0.9] hover:scale-[1.05] active:translate-y-[1px] transition-all"
          onClick={() => {
            onSubmit(form.getValues());
          }}
        >
          <span className="block text-md">Post</span>
          <SendHorizontal className="size-[13px] block" />
        </button>
      </div>
    </main>
  );
};
