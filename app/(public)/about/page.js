import { AboutHero } from '@/components/public/about/about-hero';
import { AboutProblem } from '@/components/public/about/about-problem';
import { AboutPhilosophy } from '@/components/public/about/about-philosophy';
import { AboutPrinciples } from '@/components/public/about/about-principles';
import { AboutAudience } from '@/components/public/about/about-audience';
import { AboutBoundaries } from '@/components/public/about/about-boundaries';
import { AboutTrust } from '@/components/public/about/about-trust';
import { AboutStory } from '@/components/public/about/about-story';
import { FinalCTA } from '@/components/public/final-cta';

export const metadata = {
  title: 'About Trading Journal — A Better Way to Learn From Your Trades',
  description: 'Learn why Trading Journal exists and how structured trade journaling can help traders review decisions, recognize patterns, and build a more intentional process.',
  openGraph: {
    title: 'About Trading Journal',
    description: 'Learn why Trading Journal exists and how structured trade journaling can help traders review decisions, recognize patterns, and build a more intentional process.',
  }
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutProblem />
      <AboutPhilosophy />
      <AboutPrinciples />
      <AboutAudience />
      <AboutBoundaries />
      <AboutTrust />
      <AboutStory />
      <FinalCTA />
    </div>
  );
}
