import Image from 'next/image';
import { Reveal } from '@/components/public/motion/reveal';

export function FeatureTradeJournal() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <Reveal delay={150} direction="right" className="order-2 lg:order-1 relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden bg-subtle-background">
            <Image 
              src="/images/2.webp" 
              alt="Trading Journal trade journal showing recorded trades and performance" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto object-cover object-top"
            />
          </Reveal>

          <Reveal delay={0} direction="left" className="order-1 lg:order-2 space-y-6 max-w-lg lg:ml-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Every trade has a lesson.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              A free trading journal built to help you record, organize, and review every trade.
            </p>
            <div className="space-y-6 pt-6 border-t border-border/50">
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Trade Details</h3>
                <p className="text-sm text-secondary-text">Capture the information that matters for every trade.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Organized History</h3>
                <p className="text-sm text-secondary-text">Keep your trades together instead of scattered across spreadsheets and notes.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Trade Context</h3>
                <p className="text-sm text-secondary-text">Record the context behind your decisions.</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
