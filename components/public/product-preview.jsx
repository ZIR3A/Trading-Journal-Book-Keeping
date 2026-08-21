import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function ProductPreviewSection() {
  return (
    <section className="py-24 bg-subtle-background/50 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
            Everything you need to review your trading.
          </h2>
          <p className="mt-4 text-secondary-text max-w-2xl mx-auto">
            A clean, functional interface designed to stay out of your way while you record and analyze your trades.
          </p>
        </div>

        {/* Stacked Product Screenshots */}
        <div className="relative max-w-6xl mx-auto h-[350px] sm:h-[500px] md:h-[700px]">
          
          {/* Main Background Layer */}
          <div className="absolute top-0 left-0 right-12 md:right-32 bottom-12 rounded border border-border bg-subtle-background shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
            <Image 
              src="/analytics-1.png" 
              alt="Trading Journal Analytics Interface" 
              fill
              className="object-cover object-left-top"
            />
          </div>

          {/* Floating Foreground Layer */}
          <div className="absolute top-16 md:top-24 right-0 bottom-0 left-1/4 md:left-1/3 lg:left-1/2 rounded border border-border bg-subtle-background shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 ease-out fill-mode-both">
            <Image 
              src="/trade-detail-1.png" 
              alt="Trading Journal Detail Interface" 
              fill
              className="object-cover object-left-top"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
