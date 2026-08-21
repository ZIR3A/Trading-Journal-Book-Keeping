import Image from 'next/image';
import { Reveal } from '@/components/public/motion/reveal';

export function FeatureTradeReview() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <Reveal delay={0} direction="right" className="space-y-6 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Remember why you took the trade.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              Go back to any recorded trade and review the details behind the result—from the setup and execution to notes and other context captured in your free trading journal.
            </p>
            <div className="space-y-6 pt-6 border-t border-border/50">
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Trade Context</h3>
                <p className="text-sm text-secondary-text">Keep the information behind the trade with the result.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Decision Notes</h3>
                <p className="text-sm text-secondary-text">Record what you were thinking at the time.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Historical Review</h3>
                <p className="text-sm text-secondary-text">Return to previous trades whenever you need to learn from your history.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} direction="left" className="relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden bg-subtle-background">
            <Image 
              src="/images/6.webp" 
              alt="Trading Journal trade detail showing trade performance and review notes" 
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
