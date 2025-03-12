"use client";

import { newUserFormSchema, type NewUserFormType } from "@/modules/user/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const NotFoundView = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<NewUserFormType>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: {
      displayName: session?.user?.name ?? "",
      profilePicture: "",
      username: "",
    },
  });

  const { mutate: createNewAccount, isPending } = useMutation({
    mutationFn: async (data: NewUserFormType) => {
      await client.user.createUser.$post(data);
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong, please try again later");
    },
  });

  const onSubmit = (data: NewUserFormType) => {
    createNewAccount(data);
  };

  return (
    <div>
      <h2 className="mb-20 font-semibold">One more step</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your display name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your profile picture (optional)</FormLabel>
                <FormControl>
                  {/* // TODO: Replace with drag and drop */}
                  <Input type="file" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending}>Submit</Button>
        </form>
      </Form>
    </div>
  );
};
