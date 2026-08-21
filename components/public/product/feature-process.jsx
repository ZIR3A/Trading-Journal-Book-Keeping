import Image from 'next/image';
import { Reveal } from '@/components/public/motion/reveal';

export function FeatureProcess() {
  return (
    <section className="py-24 border-t border-border bg-subtle-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <Reveal delay={150} direction="right" className="order-2 lg:order-1 relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden bg-subtle-background">
            <Image 
              src="/images/7.webp" 
              alt="Trading Journal trade entry form showing setup and risk details" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto object-cover object-top"
            />
          </Reveal>

          <Reveal delay={0} direction="left" className="order-1 lg:order-2 space-y-6 max-w-lg lg:ml-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Trade your plan. Review your process.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              Record the context behind each trade—from setup and execution to risk and notes—then use your history to review how consistently you followed your process.
            </p>
            <div className="space-y-6 pt-6 border-t border-border/50">
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Risk Context</h3>
                <p className="text-sm text-secondary-text">Keep relevant risk information like target R-multiple with the trade.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Trade Plan</h3>
                <p className="text-sm text-secondary-text">Record the setup and intended approach.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary uppercase mb-1">Decision Notes</h3>
                <p className="text-sm text-secondary-text">Capture what influenced the trade and review the decisions behind the result.</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
