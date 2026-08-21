export function ProblemSection() {
  return (
    <section id="problem" className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-primary tracking-tight leading-tight">
              Your trades tell a story. <br className="hidden sm:inline" />
              <span className="text-secondary-text">Your journal should help you see it.</span>
            </h2>
          </div>

          <div className="space-y-6 text-base md:text-lg text-secondary-text leading-relaxed border-l-2 border-border pl-6 md:pl-10">
            <p>
              Trading generates a large amount of information. Without structured journaling, traders easily forget the context of their decisions.
            </p>
            <p>
              When a trade is closed, do you remember why you entered? What you saw in the market? How you felt? What went wrong, and what patterns are repeating?
            </p>
            <p className="font-medium text-primary">
              The product provides a structured place to capture and review that information securely.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
