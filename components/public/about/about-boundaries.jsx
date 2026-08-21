export function AboutBoundaries() {
  const boundaries = [
    "a signal provider",
    "an automated trading system",
    "a guaranteed-profit tool",
    "a market prediction engine",
    "a replacement for risk management",
    "financial advice"
  ];

  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-display font-medium text-primary tracking-tight mb-8">
          Who it is not for
        </h2>
        
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
          <p className="text-secondary-text text-lg font-body">
            Clarity requires honesty about what a product cannot do. The Trading Journal App is <span className="font-semibold text-primary">not</span> intended to be:
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {boundaries.map((boundary, index) => (
              <li key={index} className="flex items-center gap-3 text-secondary-text font-body">
                <div className="h-1 w-1 rounded-full bg-border" />
                {boundary}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
