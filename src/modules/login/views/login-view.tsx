import { providers } from "@/lib/auth";
import { LoginOAuthProvider } from "../components/login-o-auth-provider";
import { LoginWarning } from "../components/login-warning";
import { Suspense } from "react";

export const LoginView = () => {
  return (
    <main className="w-full h-screen grid place-items-center">
      <Suspense>
        <LoginWarning />
      </Suspense>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-xl">Login</h1>
        <ul className="flex items-center gap-5">
          {providers.map((provider) => (
            <li key={provider}>
              <LoginOAuthProvider provider={provider} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
