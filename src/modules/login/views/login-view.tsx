"use client";
// PERF: Should this be client component?

import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { LoginLoader } from "../components/login-loader";
import { LoginWarning } from "../components/login-warning";
import { NotFoundView } from "./not-found-view";
import { UnauthenticatedView } from "./unauthenticated-view";

export const LoginView = () => {
  const {
    data: status,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user-status"],
    queryFn: async () => {
      const res = await client.applicationAuth.getUserStatus.$get();
      const { status } = await res.json();
      return status;
    },
  });

  return (
    <main className="w-full h-screen grid place-items-center">
      {error?.message}
      <Suspense>
        <LoginWarning />
      </Suspense>
      {isPending ? (
        <LoginLoader />
      ) : status === "unauthorized" ? (
        <UnauthenticatedView />
      ) : (
        // Authorized user should ideally have been redirected
        <NotFoundView />
      )}
    </main>
  );
};
