import Image from 'next/image';
import { Reveal } from '@/components/public/motion/reveal';

export function FeatureEquityCurve() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <Reveal delay={0} direction="right" className="space-y-6 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              See the story behind your performance.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              An equity curve puts every recorded result into context, helping you see periods of growth, drawdown, consistency, and change over time.
            </p>
            <div className="space-y-6 pt-6 border-t border-border/50">
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Cumulative Progress</h3>
                <p className="text-sm text-secondary-text">Track your net realized performance from your first recorded trade to your most recent.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Drawdown Context</h3>
                <p className="text-sm text-secondary-text">See growth and drawdown periods in context to understand your true trading consistency.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} direction="left" className="relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden bg-subtle-background">
            <Image 
              src="/images/4.webp" 
              alt="Trading Journal equity curve showing cumulative trading performance" 
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
