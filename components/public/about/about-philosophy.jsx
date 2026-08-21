import { Reveal } from '@/components/public/motion/reveal';

export function AboutPhilosophy() {
  return (
    <section className="py-32 md:py-48 bg-primary text-primary-foreground text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <Reveal delay={0} duration={1000}>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-semibold tracking-tight leading-tight">
            The goal isn't to predict every trade. <br className="hidden md:inline" />
            <span className="text-primary-foreground/60">It's to understand your process.</span>
          </h2>
        </Reveal>
        <Reveal delay={300} duration={1000}>
          <div className="mt-12 space-y-6 text-lg md:text-xl text-primary-foreground/70 leading-relaxed max-w-3xl mx-auto font-body">
            <p>
              This journal is not built to predict markets, guarantee results, or make decisions for you. It cannot replace your own judgment.
            </p>
            <p>
              Instead, it is designed to help you document, review, reflect, and identify the patterns in your own trading. True consistency comes from awareness.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
