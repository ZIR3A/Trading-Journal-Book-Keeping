export function AboutProblem() {
  return (
    <section className="py-24 md:py-32 bg-subtle-background/50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          <div className="md:col-span-5">
            <h2 className="text-3xl md:text-5xl font-display font-medium text-primary tracking-tight leading-snug">
              A trade ends. <br /> The learning doesn't have to.
            </h2>
          </div>

          <div className="md:col-span-7 space-y-6 text-lg md:text-xl text-secondary-text leading-relaxed font-body">
            <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
              A trade is often remembered as a series of numbers: an entry, an exit, and a profit or loss. But those numbers rarely explain the entire decision.
            </p>
            <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 ease-out fill-mode-both">
              The useful context includes what was happening in the market, what you expected to see, why the trade was taken, and how risk was considered. It includes what changed during the trade, how you responded, and what should be repeated or avoided next time.
            </p>
            <p className="text-primary font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 ease-out fill-mode-both">
              The journal exists to preserve that context.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
