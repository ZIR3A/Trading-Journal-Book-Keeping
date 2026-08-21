import Image from 'next/image';
import { Reveal } from '@/components/public/motion/reveal';

export function FeaturePerformance() {
  return (
    <section className="py-24 border-t border-border bg-subtle-background/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Know what is actually working.
            </h2>
            <p className="text-secondary-text text-lg">
              Your journal becomes more valuable when you can see the patterns in your performance. Track the metrics your free trading journal can reveal and use them to understand your process.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} direction="up" className="relative rounded border border-border shadow-xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-start justify-center overflow-hidden bg-subtle-background max-w-5xl mx-auto">
          <Image 
            src="/images/3.webp" 
            alt="Trading Journal analytics dashboard showing trading performance metrics" 
            width={1920}
            height={1080}
            className="w-[102%] max-w-none h-auto object-cover object-top"
          />
        </Reveal>

        <Reveal delay={300} direction="up" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="border-t border-border/50 pt-4">
            <h3 className="text-sm font-medium text-primary uppercase mb-1">Overall Performance</h3>
            <p className="text-sm text-secondary-text">Understand your historical results and total P&L.</p>
          </div>
          <div className="border-t border-border/50 pt-4">
            <h3 className="text-sm font-medium text-primary uppercase mb-1">Trade Quality</h3>
            <p className="text-sm text-secondary-text">Review available performance metrics like win rate, profit factor, and expectancy.</p>
          </div>
          <div className="border-t border-border/50 pt-4">
            <h3 className="text-sm font-medium text-primary uppercase mb-1">Breakdowns</h3>
            <p className="text-sm text-secondary-text">Compare supported categories such as strategies, symbols or direction.</p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
