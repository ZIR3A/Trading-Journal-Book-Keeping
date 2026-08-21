import Image from 'next/image';
import { Reveal } from '@/components/public/motion/reveal';

export function FeatureCalendar() {
  return (
    <section className="py-24 border-t border-border bg-subtle-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <Reveal delay={150} direction="right" className="order-2 lg:order-1 relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden bg-subtle-background">
            <Image 
              src="/images/5.webp" 
              alt="Trading Journal calendar showing daily trading activity" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto object-cover object-top"
            />
          </Reveal>

          <Reveal delay={0} direction="left" className="order-1 lg:order-2 space-y-6 max-w-lg lg:ml-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              See your trading activity over time.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              A calendar view makes it easy to see when you traded, review daily results, and spot patterns across your trading history.
            </p>
            <div className="space-y-6 pt-6 border-t border-border/50">
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Trading Rhythm</h3>
                <p className="text-sm text-secondary-text">See your trading rhythm at a glance. Spot active periods, quiet periods, and daily performance patterns.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Trade Details</h3>
                <p className="text-sm text-secondary-text">See your trading activity directly on the calendar, then open the days that matter to review the trades behind the results.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Completely Free</h3>
                <p className="text-sm text-secondary-text">This functional calendar view is included as a core feature of your free trading journal.</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
