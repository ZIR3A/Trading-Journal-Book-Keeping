import { ArrowRight, CheckCircle2 } from 'lucide-react';

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

        {/* Abstracted UI Composition */}
        <div className="relative max-w-6xl mx-auto h-[500px] md:h-[700px]">
          
          {/* Main Dashboard Layer */}
          <div className="absolute top-0 left-0 right-12 md:right-32 bottom-12 rounded-lg border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
            <div className="h-12 border-b border-border flex items-center px-6 bg-subtle-background/30">
              <div className="h-4 w-32 bg-border/40 rounded-sm" />
            </div>
            <div className="p-8 space-y-8">
              <div className="flex gap-4">
                <div className="h-24 w-1/4 bg-primary/5 border border-border rounded-sm p-4 flex flex-col justify-between">
                  <div className="h-3 w-16 bg-secondary-text/30 rounded-sm" />
                  <div className="h-6 w-24 bg-primary/80 rounded-sm" />
                </div>
                <div className="h-24 w-1/4 bg-primary/5 border border-border rounded-sm p-4 flex flex-col justify-between">
                  <div className="h-3 w-16 bg-secondary-text/30 rounded-sm" />
                  <div className="h-6 w-24 bg-profit/80 rounded-sm" />
                </div>
                <div className="h-24 w-1/4 bg-primary/5 border border-border rounded-sm p-4 flex flex-col justify-between">
                  <div className="h-3 w-16 bg-secondary-text/30 rounded-sm" />
                  <div className="h-6 w-24 bg-profit/80 rounded-sm" />
                </div>
                <div className="h-24 w-1/4 bg-primary/5 border border-border rounded-sm p-4 flex flex-col justify-between">
                  <div className="h-3 w-16 bg-secondary-text/30 rounded-sm" />
                  <div className="h-6 w-24 bg-loss/80 rounded-sm" />
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 border border-border rounded-sm flex items-center px-6 gap-6">
                    <div className="h-4 w-12 bg-border/40 rounded-sm" />
                    <div className="h-4 w-24 bg-border/60 rounded-sm" />
                    <div className="h-4 w-32 bg-border/40 rounded-sm ml-auto" />
                    <div className={`h-6 w-16 rounded-sm ${i % 3 === 0 ? 'bg-loss/20' : 'bg-profit/20'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trade Details Floating Layer */}
          <div className="absolute top-24 right-0 bottom-0 left-1/3 md:left-1/2 rounded-lg border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 ease-out fill-mode-both">
            <div className="h-12 border-b border-border flex items-center px-6 justify-between bg-subtle-background/30">
              <div className="h-4 w-24 bg-border/40 rounded-sm" />
              <div className="h-6 w-16 bg-primary/10 rounded-sm" />
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <div className="h-8 w-32 bg-primary/80 rounded-sm" />
                <div className="h-4 w-48 bg-secondary-text/40 rounded-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-secondary-text/30 rounded-sm" />
                  <div className="h-10 border border-border rounded-sm bg-subtle-background/20" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-secondary-text/30 rounded-sm" />
                  <div className="h-10 border border-border rounded-sm bg-subtle-background/20" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-3 w-32 bg-secondary-text/30 rounded-sm" />
                <div className="h-32 border border-border rounded-sm bg-subtle-background/20 p-4 space-y-3">
                  <div className="h-3 w-full bg-border/40 rounded-sm" />
                  <div className="h-3 w-5/6 bg-border/40 rounded-sm" />
                  <div className="h-3 w-4/6 bg-border/40 rounded-sm" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
