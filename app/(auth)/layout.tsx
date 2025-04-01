import Image from "next/image";
export const metadata = {
  title: "Authentication",
};

export default function AuthLayout({children,}: Readonly<{children: React.ReactNode;}>){
  return (
        <div className="min-w-[100vw] min-h-screen auth-bg flex items-center justify-center">
            <div className="min-h-[85vh] w-[90%] bg-[white] rounded-[20px] [box-shadow:0px_4px_32.3px_0px_rgba(0,_0,_0,_0.07)] flex overflow-hidden">
                <div className="flex flex-1 items-center justify-center">
                    {children}
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <Image src="/images/auth.jpg" alt="Auth" width={600} height={500}/>
                </div>
            </div>
        </div>
  );
};