export function FeatureOrganization() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative rounded border border-border bg-card shadow-xl p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
            <div className="flex gap-2 border-b border-border pb-6">
               <div className="h-8 w-24 bg-border/40 rounded-sm" />
               <div className="h-8 w-24 bg-border/40 rounded-sm" />
               <div className="h-8 w-24 bg-primary/80 rounded-sm" />
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-4 bg-border/80 rounded-sm" />
                    <div className="h-4 w-16 bg-primary/80 rounded-sm" />
                  </div>
                  <div className="h-4 w-24 bg-secondary-text/30 rounded-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6 max-w-lg lg:ml-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Find the trades that matter.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              Structured records make your historical trades easy to navigate. Stop digging through disconnected spreadsheets.
            </p>
            <ul className="space-y-3 pt-4 border-t border-border/50">
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Filter by symbol and direction
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Searchable history
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Organized timeline of events
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
