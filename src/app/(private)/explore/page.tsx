"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Page = () => {
  return (
    <div>
      Explore page
      <Button
        onClick={async () => {
          await signOut({
            redirectTo: "/login",
          });
        }}
      >
        signout
      </Button>
    </div>
  );
};

export default Page;
