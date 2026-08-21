import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export function WorkflowHero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border bg-subtle-background/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary-text">
            How It Works
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-primary leading-tight">
            Record. Review. Refine.
          </h1>
          
          <p className="text-lg md:text-xl text-secondary-text max-w-2xl mx-auto leading-relaxed">
            See how the trading journal workflow helps you record trades, review decisions, understand patterns, and refine your process.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/login" className={buttonVariants({ variant: 'default', size: 'lg', className: "w-full sm:w-auto rounded-none px-8" })}>
              Start Journaling
            </Link>
            <Link href="/product" className={buttonVariants({ variant: 'outline', size: 'lg', className: "w-full sm:w-auto rounded-none px-8 bg-transparent" })}>
              Explore Features
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
