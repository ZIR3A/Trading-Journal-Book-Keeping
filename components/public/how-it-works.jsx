export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Record',
      description: 'Capture the trade while the context is fresh. Log your setup, risk, and reasoning securely.',
    },
    {
      number: '02',
      title: 'Review',
      description: 'Come back to your trades and examine what happened. Compare your plan to the actual execution.',
    },
    {
      number: '03',
      title: 'Improve',
      description: 'Use your journal to identify patterns and refine your process for long-term consistency.',
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
          
          <div className="md:col-span-4 space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
              A simple process.
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-sm">
              The journal works best when it becomes a natural part of your trading routine.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="space-y-6">
                <div className="text-sm font-mono tracking-widest text-primary-foreground/50 border-b border-primary-foreground/20 pb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
