import Image from 'next/image';
import { Reveal } from '@/components/public/motion/reveal';

export function FeatureInsights() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <Reveal delay={0} direction="right" className="space-y-6 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Find the patterns in your trading history.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              The more trades you record, the more useful your history becomes. Compare the dimensions your free trading journal tracks to understand where your results come from.
            </p>
            <div className="space-y-6 pt-6 border-t border-border/50">
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Compare</h3>
                <p className="text-sm text-secondary-text">Break down your results across supported categories like setups and long vs. short direction.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Identify</h3>
                <p className="text-sm text-secondary-text">See where your historical performance differs to understand your R-distribution patterns.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Review</h3>
                <p className="text-sm text-secondary-text">Use the findings as context for future trade reviews.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} direction="left" className="relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden bg-subtle-background">
            <Image 
              src="/analytics-1.png" 
              alt="Free trading journal showing historical patterns, setup comparisons, and long/short breakdowns" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto object-cover object-top"
            />
          </Reveal>

        </div>
      </div>
    </section>
  );
}
