"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const LoginWarning = () => {
  const params = useSearchParams();
  const warn = params.get("warn");
  useEffect(() => {
    if (warn) {
      toast.error("Login to continue");
    }
  }, [warn]);
  return null;
};
