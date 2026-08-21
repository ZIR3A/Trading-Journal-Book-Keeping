import { HeroSection } from '@/components/public/hero-section';
import { PositioningSection } from '@/components/public/positioning-section';
import { ProblemSection } from '@/components/public/problem-section';
import { CapabilitiesSection } from '@/components/public/capabilities-section';
import { ProductPreviewSection } from '@/components/public/product-preview';
import { HowItWorksSection } from '@/components/public/how-it-works';
import { FinalCTA } from '@/components/public/final-cta';

export default function PublicHomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PositioningSection />
      <ProblemSection />
      <ProductPreviewSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <FinalCTA />
    </div>
  );
}
