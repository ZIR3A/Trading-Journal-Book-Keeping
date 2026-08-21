import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Reveal } from '@/components/public/motion/reveal';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
        
        <Reveal delay={0}>
          <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm font-medium text-secondary-text mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Now available for traders
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-primary tracking-tight mb-6">
            Record every decision.<br className="hidden md:inline" /> Understand your edge.
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-4 text-xl text-secondary-text max-w-2xl mx-auto font-body mb-10 leading-relaxed">
            The minimal, professional trading journal for active traders. Stop wrestling with spreadsheets and start analyzing your actual performance.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className={buttonVariants({ variant: 'default', size: 'lg', className: "w-full sm:w-auto rounded-none h-12 px-8" })}>
              Start Journaling
            </Link>
            <Link href="/product" className={buttonVariants({ variant: 'outline', size: 'lg', className: "w-full sm:w-auto rounded-none h-12 px-8" })}>
              Explore the Product
            </Link>
          </div>
        </Reveal>
        
      </div>

      <Reveal delay={600} direction="up" className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="bg-card border border-border p-2 shadow-2xl">
          <div className="aspect-[16/9] w-full bg-subtle-background flex items-center justify-center overflow-hidden border border-border relative">
            
            {/* Minimalist Wireframe Representation of the App */}
            <div className="absolute inset-0 flex flex-col">
              {/* Header */}
              <div className="h-12 border-b border-border flex items-center px-6 gap-4">
                <div className="h-4 w-24 bg-border opacity-50"></div>
                <div className="h-4 w-16 bg-border opacity-50"></div>
                <div className="h-4 w-16 bg-border opacity-50"></div>
              </div>
              <div className="flex-1 flex p-6 gap-6">
                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                  {/* Top Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="h-24 bg-background border border-border"></div>
                    <div className="h-24 bg-background border border-border"></div>
                    <div className="h-24 bg-background border border-border"></div>
                  </div>
                  {/* Chart Area */}
                  <div className="h-64 bg-background border border-border"></div>
                </div>
                
                {/* Sidebar */}
                <div className="w-1/3 bg-background border border-border flex flex-col">
                  <div className="h-12 border-b border-border bg-subtle-background/50"></div>
                  <div className="flex-1 p-4 space-y-4">
                    <div className="h-12 bg-subtle-background"></div>
                    <div className="h-12 bg-subtle-background"></div>
                    <div className="h-12 bg-subtle-background"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Reveal>
    </section>
  );
}
