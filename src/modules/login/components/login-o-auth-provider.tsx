"use client";
import { Button } from "@/components/ui/button";
import { providers } from "@/lib/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginOAuthProvider = ({
  provider,
}: {
  provider: (typeof providers)[number];
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await signIn(provider);
        router.refresh();
      }}
    >
      Login with {provider}
    </Button>
  );
};
