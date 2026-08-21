export function AboutPrinciples() {
  const principles = [
    {
      num: "01",
      title: "Record Honestly",
      description: "A journal is only useful when it reflects what actually happened. Hiding mistakes from yourself prevents learning."
    },
    {
      num: "02",
      title: "Review Regularly",
      description: "A trade becomes more valuable when it can be revisited with hindsight. Regular review is the mechanism for improvement."
    },
    {
      num: "03",
      title: "Focus on Process",
      description: "One outcome does not define a trading process. Good decisions can result in losses, and bad decisions can result in wins."
    },
    {
      num: "04",
      title: "Look for Patterns",
      description: "Repeated behavior can reveal more than isolated results. The journal helps aggregate those patterns."
    },
    {
      num: "05",
      title: "Improve Intentionally",
      description: "The purpose of reflection is not merely to keep a log, but to create a better process over time."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-secondary-text mb-16 border-b border-border pb-4">
          Core Principles
        </h2>
        
        <div className="space-y-16">
          {principles.map((p, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row gap-6 sm:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-3xl md:text-5xl font-mono font-light text-border">
                {p.num}
              </div>
              <div className="space-y-4 pt-1">
                <h3 className="text-2xl md:text-3xl font-display font-medium text-primary tracking-tight">
                  {p.title}
                </h3>
                <p className="text-lg text-secondary-text leading-relaxed font-body">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
