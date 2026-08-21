import { WorkflowHero } from '@/components/public/how-it-works/workflow-hero';
import { WorkflowSteps } from '@/components/public/how-it-works/workflow-steps';
import { FinalCTA } from '@/components/public/final-cta';

export const metadata = {
  title: 'How Trading Journal Works — Record, Review, Refine',
  description: 'See how the trading journal workflow helps you record trades, review decisions, understand patterns, and refine your process.',
  openGraph: {
    title: 'How Trading Journal Works',
    description: 'See how the trading journal workflow helps you record trades, review decisions, understand patterns, and refine your process.',
  }
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      <WorkflowHero />
      <WorkflowSteps />
      <FinalCTA />
    </div>
  );
}
