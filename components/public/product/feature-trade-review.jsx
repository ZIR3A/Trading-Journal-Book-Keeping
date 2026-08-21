export function FeatureTradeReview() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Review decisions, <br/> not just results.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              Looking back at completed trades helps you understand the gap between expectation and reality. It reveals what you can learn from every experience.
            </p>
            <ul className="space-y-3 pt-4 border-t border-border/50">
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Review what you expected
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Evaluate how you managed the trade
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Analyze what actually happened
              </li>
            </ul>
          </div>

          <div className="relative rounded border border-border bg-card shadow-xl p-6 h-[400px] flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-1000 ease-out">
            <div className="h-8 w-48 bg-primary/10 rounded-sm mb-4" />
            
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded-sm p-4 flex items-center justify-between hover:bg-subtle-background/50 transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-16 bg-primary/80 rounded-sm" />
                    <div className="h-4 w-24 bg-border/60 rounded-sm" />
                  </div>
                  <div className="h-3 w-48 bg-secondary-text/40 rounded-sm" />
                </div>
                <div className={`h-8 w-20 rounded-sm ${i % 2 === 0 ? 'bg-loss/20' : 'bg-profit/20'}`} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
