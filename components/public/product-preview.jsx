import Image from 'next/image';
import { Reveal } from '@/components/public/motion/reveal';

export function ProductPreviewSection() {
  return (
    <section className="py-24 bg-subtle-background/30 border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Everything starts with the journal.
            </h2>
            <p className="mt-4 text-secondary-text max-w-2xl mx-auto text-lg">
              Record your trades in one place, then use that history to understand how you actually trade.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} direction="up" className="relative max-w-5xl mx-auto">
          <div className="bg-card border border-border p-2 shadow-xl">
            <div className="w-full bg-subtle-background flex items-center justify-center overflow-hidden border border-border relative">
              <Image 
                src="/trade-entry-1.png" 
                alt="Trading Journal Entry Interface" 
                width={1920}
                height={1080}
                className="w-[102%] max-w-none h-auto"
                priority={false}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
