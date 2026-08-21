import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Reveal } from '@/components/public/motion/reveal';

export function ProductHero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border bg-subtle-background/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Reveal delay={0}>
            <p className="text-xs font-semibold tracking-widest uppercase text-secondary-text">
              The Trading Journal
            </p>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-primary leading-tight">
              A clearer way to understand every trade.
            </h1>
          </Reveal>
          
          <Reveal delay={300}>
            <p className="text-lg md:text-xl text-secondary-text max-w-2xl mx-auto leading-relaxed">
              Capture the decisions behind your trades, review what happened, and build a structured record of your trading process.
            </p>
          </Reveal>
          
          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/login" className={buttonVariants({ variant: 'default', size: 'lg', className: "w-full sm:w-auto rounded-none px-8" })}>
                Start Journaling
              </Link>
              <Link href="/how-it-works" className={buttonVariants({ variant: 'outline', size: 'lg', className: "w-full sm:w-auto rounded-none px-8 bg-transparent" })}>
                See How It Works
              </Link>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
