import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Reveal } from '@/components/public/motion/reveal';

export function FinalCTA() {
  return (
    <section className="py-32 md:py-48 text-center border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Reveal delay={0}>
          <div className="inline-block px-3 py-1 bg-subtle-background border border-border text-xs font-mono uppercase tracking-wider text-secondary-text mb-6">
            Start Journaling
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-primary leading-tight">
            Build a trading history you can learn from.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-secondary-text max-w-2xl mx-auto leading-relaxed">
            Record your trades, review your performance, and keep your trading history organized with a free trading journal.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <Link href="/login" className={buttonVariants({ variant: 'default', size: 'lg', className: "w-full sm:w-auto rounded-none px-12 py-6 text-base" })}>
              Start Journaling
            </Link>
            <p className="text-sm text-secondary-text mt-2 font-mono uppercase tracking-wider">
              Free to use. No subscription required.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
