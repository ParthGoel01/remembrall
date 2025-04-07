"use client";

import { newPostSchema, NewPostSchema } from "@/app/types/form-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CustomEasyMDE } from "../editor/easy-mde";
import { useState } from "react";

export const NewPost = () => {
  const form = useForm<NewPostSchema>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      heading: "",
    },
  });

  const [editorData, setEditorData] = useState<string>("");

  const onSubmit = async (data: NewPostSchema) => {
    console.log(editorData);
    console.log(data);
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
        <Button
          className="cursor-pointer"
          onClick={() => {
            onSubmit(form.getValues());
          }}
        >
          Post
        </Button>
      </div>
    </main>
  );
};
