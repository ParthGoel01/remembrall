"use client";

import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["dummy"],
    queryFn: async () => {
      const dummyData = await client.dummy.dummy.$get();
      return await dummyData.json();
    },
  });
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {data && <div>{data.message}</div>}
    </div>
  );
}
