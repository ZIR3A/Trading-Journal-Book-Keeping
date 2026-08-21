export function ProductOverview() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 ease-out fill-mode-both">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-primary tracking-tight leading-snug">
            Your trading history should be more than a list of wins and losses.
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-secondary-text leading-relaxed max-w-3xl mx-auto">
            <p>
              A useful journal captures context. To improve, you need to remember why a trade was taken, the setup you identified, what the market conditions looked like, and how the risk was managed.
            </p>
            <p>
              Trading Journal provides a structured workspace for this information, ensuring you can learn from what happened afterward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
