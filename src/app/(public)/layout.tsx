import { SessionRedirect } from "@/modules/auth/components/session-redirect";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionRedirect condition="authenticated" to="/explore" />
      {children}
    </>
  );
};

export default PublicLayout;
