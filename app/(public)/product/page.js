import { ProductHero } from '@/components/public/product/product-hero';
import { ProductOverview } from '@/components/public/product/product-overview';
import { FeatureTradeJournal } from '@/components/public/product/feature-trade-journal';
import { FeatureTradeReview } from '@/components/public/product/feature-trade-review';
import { FeaturePerformance } from '@/components/public/product/feature-performance';
import { FeatureOrganization } from '@/components/public/product/feature-organization';
import { FinalCTA } from '@/components/public/final-cta';

export const metadata = {
  title: 'Trading Journal Features — Everything You Need to Review Your Trades',
  description: 'Explore the tools and workflow behind a focused trading journal for recording, reviewing, and understanding your trades.',
  openGraph: {
    title: 'Trading Journal Features',
    description: 'Explore the tools and workflow behind a focused trading journal for recording, reviewing, and understanding your trades.',
  }
};

export default function ProductPage() {
  return (
    <div className="flex flex-col">
      <ProductHero />
      <ProductOverview />
      <FeatureTradeJournal />
      <FeatureTradeReview />
      <FeaturePerformance />
      <FeatureOrganization />
      <FinalCTA />
    </div>
  );
}
