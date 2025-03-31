import HeroSection from "@/components/home/hero-section";
import DemoSection from "@/components/home/demo-section";
import CTASection from "@/components/home/cta-section";
import Dashboard from "@/components/dashboard/dashboard";
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="relative w-full">
      <SignedOut>
        <HeroSection />
        <DemoSection />
        <CTASection />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}
