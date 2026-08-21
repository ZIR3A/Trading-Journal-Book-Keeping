export function FeatureTradeJournal() {
  return (
    <section className="py-24 border-t border-border bg-subtle-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative rounded border border-border bg-card shadow-xl h-[400px] flex flex-col p-6 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
            <div className="flex justify-between border-b border-border pb-4 mb-4">
              <div className="h-6 w-32 bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">NEW TRADE</div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-secondary-text/50 rounded-sm" />
                  <div className="h-10 border border-border rounded-sm bg-subtle-background/20" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-secondary-text/50 rounded-sm" />
                  <div className="h-10 border border-border rounded-sm bg-subtle-background/20" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-16 bg-secondary-text/50 rounded-sm" />
                    <div className="h-10 border border-border rounded-sm bg-subtle-background/20" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-secondary-text/50 rounded-sm" />
                <div className="h-24 border border-border rounded-sm bg-subtle-background/20" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6 max-w-lg lg:ml-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Record the trade. <br/> Capture the context.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              Document your trades and the reasoning behind them quickly. A trade record should explain exactly what happened from entry to exit.
            </p>
            <ul className="space-y-3 pt-4 border-t border-border/50">
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Entry and exit information
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Position sizing and risk details
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Setup context and reflections
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
