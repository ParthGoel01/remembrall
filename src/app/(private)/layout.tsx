import { SessionRedirect } from "@/modules/auth/components/session-redirect";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionRedirect condition="unauthenticated" to="/login?warn=true" />
      {children}
    </>
  );
};

export default PrivateLayout;
