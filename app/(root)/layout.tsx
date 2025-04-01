import Header from '@/components/common/header';
import Footer from "@/components/common/footer";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div className="relative flex flex-col min-h-screen">
          <Header/>
            <main className="flex-1">{children}</main>
          <Footer />
        </div>
    );
}
