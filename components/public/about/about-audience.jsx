export function AboutAudience() {
  return (
    <section className="py-24 bg-subtle-background/50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-display font-medium text-primary tracking-tight mb-12">
          Who it is for
        </h2>
        
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
          
          <div className="pl-6 border-l-2 border-border space-y-3">
            <h3 className="text-xl font-medium text-primary tracking-tight">New Traders</h3>
            <p className="text-secondary-text leading-relaxed font-body">
              For those beginning to build a structured trading routine. Establishing good journaling habits early prevents the development of bad execution habits.
            </p>
          </div>
          
          <div className="pl-6 border-l-2 border-border space-y-3">
            <h3 className="text-xl font-medium text-primary tracking-tight">Active Traders</h3>
            <p className="text-secondary-text leading-relaxed font-body">
              For traders who want a consistent, reliable record of their daily activity without wrestling with messy, unorganized spreadsheets.
            </p>
          </div>

          <div className="pl-6 border-l-2 border-border space-y-3">
            <h3 className="text-xl font-medium text-primary tracking-tight">Experienced Traders</h3>
            <p className="text-secondary-text leading-relaxed font-body">
              For traders who want a deeper historical view of their decisions, recognizing that long-term edge relies on identifying subtle patterns in their own execution over time.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
