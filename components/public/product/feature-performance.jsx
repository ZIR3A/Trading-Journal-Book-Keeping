export function FeaturePerformance() {
  return (
    <section className="py-24 border-t border-border bg-subtle-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
            Turn your history into useful information.
          </h2>
          <p className="mt-4 text-secondary-text text-lg">
            Review your aggregated trading information to find recurring patterns and statistics that help you understand your edge.
          </p>
        </div>

        <div className="relative rounded border border-border bg-card shadow-xl p-6 md:p-10 max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border rounded-sm p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-3 w-16 bg-secondary-text/50 rounded-sm" />
                <div className="h-8 w-24 bg-primary/80 rounded-sm" />
              </div>
            ))}
          </div>
          
          <div className="border border-border rounded-sm p-6 h-64 flex items-end justify-between gap-2 overflow-hidden bg-subtle-background/10">
            {/* Fake bar chart */}
            {[40, 70, 30, 90, 50, 80, 60, 45, 85, 20, 75, 55].map((height, i) => (
              <div 
                key={i} 
                className={`w-full rounded-t-sm ${i % 3 === 0 ? 'bg-loss/40' : 'bg-profit/40'}`} 
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
