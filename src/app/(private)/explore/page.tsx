"use client";

import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data, isPending } = useQuery({
    queryKey: ["dummy"],
    queryFn: async () => {
      const response = await client.dummy.dummy.$get();
      const result = await response.json();
      return result;
    },
  });
  return <div>{isPending ? "Loading" : data?.user.email}</div>;
};

export default Page;
