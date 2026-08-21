export function AboutStory() {
  return (
    <section className="py-32 bg-background border-b border-border text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-display font-semibold text-primary tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
          Every trade leaves information behind.
        </h2>
        
        <p className="mt-8 text-lg md:text-xl text-secondary-text leading-relaxed font-body animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 ease-out fill-mode-both">
          The application turns that history into a structured record you can return to. A focused trading journal, available to use without a paywall.
        </p>
      </div>
    </section>
  );
}
