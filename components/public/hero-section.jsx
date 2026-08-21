import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { Reveal } from '@/components/public/motion/reveal';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
        
        <Reveal delay={0}>
          <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm font-medium text-secondary-text mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            A focused journal for active traders
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-primary tracking-tight mb-6">
            Trade with clarity.<br className="hidden md:inline" /> Learn from every trade.
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-4 text-xl text-secondary-text max-w-2xl mx-auto font-body mb-10 leading-relaxed">
            A trading journal built to help you record your trades, understand your performance, identify patterns, and improve your trading process.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className={buttonVariants({ variant: 'default', size: 'lg', className: "w-full sm:w-auto rounded-none h-12 px-8" })}>
              Start Journaling
            </Link>
            <Link href="#features" className={buttonVariants({ variant: 'outline', size: 'lg', className: "w-full sm:w-auto rounded-none h-12 px-8" })}>
              Explore Features
            </Link>
          </div>
        </Reveal>
        
      </div>

      <Reveal delay={600} direction="up" className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="bg-card border border-border p-2 shadow-2xl">
          <div className="w-full bg-subtle-background flex items-center justify-center overflow-hidden border border-border relative">
            <Image 
              src="/dashboard-home.png" 
              alt="Trading Journal Dashboard Interface" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto"
              priority
            />
          </div>
        </div>

      </Reveal>
    </section>
  );
}
