import { HeroSection } from '@/components/public/hero-section';
import { HowItWorksSection } from '@/components/public/how-it-works';
import { FeatureTradeJournal } from '@/components/public/product/feature-trade-journal';
import { FeaturePerformance } from '@/components/public/product/feature-performance';
import { FeatureEquityCurve } from '@/components/public/product/feature-equity-curve';
import { FeatureCalendar } from '@/components/public/product/feature-calendar';
import { FeatureTradeReview } from '@/components/public/product/feature-trade-review';
import { FeatureProcess } from '@/components/public/product/feature-process';
import { FeatureInsights } from '@/components/public/product/feature-insights';
import { FeatureOverview } from '@/components/public/feature-overview';
import { FaqSection } from '@/components/public/faq-section';
import { FinalCTA } from '@/components/public/final-cta';

export default function PublicHomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <FeatureTradeJournal />
      <FeaturePerformance />
      <FeatureEquityCurve />
      <FeatureCalendar />
      <FeatureTradeReview />
      <FeatureProcess />
      <FeatureInsights />
      <FeatureOverview />
      <FaqSection />
      <FinalCTA />
    </div>
  );
}
