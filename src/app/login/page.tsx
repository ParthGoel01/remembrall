import { SessionRedirect } from "@/modules/auth/components/session-redirect";
import { LoginView } from "@/modules/login/views/login-view";

const Page = () => {
  return (
    <>
      <SessionRedirect condition="synced" to="/explore" />
      <LoginView />
    </>
  );
};

export default Page;
