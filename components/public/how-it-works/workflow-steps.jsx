import { Reveal } from '@/components/public/motion/reveal';

export function WorkflowSteps() {
  const steps = [
    {
      number: '01',
      title: 'Create Your Journal',
      description: 'Create an account and enter the application using the secure authentication flow.',
    },
    {
      number: '02',
      title: 'Record Your Trades',
      description: 'Capture the relevant information about each trade. Documenting the decision context ensures you remember why you entered.',
    },
    {
      number: '03',
      title: 'Review What Happened',
      description: 'Return to completed trades. Review the original reasoning against the actual outcome to find the gap between expectation and reality.',
    },
    {
      number: '04',
      title: 'Identify Patterns',
      description: 'Use your history and analytics to identify recurring behaviors and patterns in your execution.',
    },
    {
      number: '05',
      title: 'Refine Your Process',
      description: 'Use the journal as a feedback loop for improving your own trading process over time.',
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="space-y-24">
          {steps.map((step, index) => (
            <Reveal key={index} delay={0} direction="up" duration={700}>
              <div 
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative h-64 w-full max-w-sm rounded border border-border bg-subtle-background/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <div className="text-8xl font-display font-bold text-border/40 select-none">
                      {step.number}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                  <div className="text-sm font-mono tracking-widest text-secondary-text border-b border-border pb-2 inline-block">
                    STEP {step.number}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-secondary-text text-lg leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
