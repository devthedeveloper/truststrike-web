import Hero from "@/components/Hero";
import GlassBox from "@/components/GlassBox";
import HowAIThinks from "@/components/HowAIThinks";
import Verification from "@/components/Verification";
import Privacy from "@/components/Privacy";
import OpenSource from "@/components/OpenSource";
import CLIPreview from "@/components/CLIPreview";
import LiveMetrics from "@/components/LiveMetrics";
import Pricing from "@/components/Pricing";
import EarlyAccess from "@/components/EarlyAccess";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <GlassBox />
      <HowAIThinks />
      <Verification />
      <Privacy />
      <OpenSource />
      <CLIPreview />
      <LiveMetrics />
      <Pricing />
      <EarlyAccess />
      <Footer />
    </main>
  );
}
