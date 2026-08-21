import { Reveal } from '@/components/public/motion/reveal';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Record',
      description: 'Capture your trades, setups, results, notes, and other details in one organized journal.',
    },
    {
      number: '02',
      title: 'Analyze',
      description: 'Turn your trading history into meaningful performance data.',
    },
    {
      number: '03',
      title: 'Review',
      description: 'Go back to individual trades and understand what happened, what worked, and what needs attention.',
    },
    {
      number: '04',
      title: 'Improve',
      description: 'Use what you learn from your journal to build a more consistent trading process.',
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        <Reveal delay={0}>
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-primary">
              Turn every trade into a learning loop.
            </h2>
            <p className="text-secondary-text text-lg">
              Record what happened, understand your performance, review your decisions, and build a clearer picture of your trading process over time.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className="space-y-6 h-full p-6 border border-border bg-card">
                <div className="text-sm font-mono tracking-widest text-primary/50 border-b border-border pb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium tracking-tight text-primary uppercase">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
