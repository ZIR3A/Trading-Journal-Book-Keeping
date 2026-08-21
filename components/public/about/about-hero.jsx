export function AboutHero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary-text">
            About the Journal
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-semibold tracking-tight text-primary leading-tight">
            Trading is a process worth remembering.
          </h1>
          
          <div className="h-px w-24 bg-border/80" />

          <p className="text-xl md:text-2xl text-secondary-text leading-relaxed max-w-3xl">
            The Trading Journal App exists to give traders a structured place to capture the decisions behind their trades and learn from the history they create.
          </p>
        </div>

      </div>
    </section>
  );
}
