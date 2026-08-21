import Image from 'next/image';

export function FeatureTradeReview() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Review decisions, <br/> not just results.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              Looking back at completed trades helps you understand the gap between expectation and reality. It reveals what you can learn from every experience.
            </p>
            <ul className="space-y-3 pt-4 border-t border-border/50">
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Review what you expected
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Evaluate how you managed the trade
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Analyze what actually happened
              </li>
            </ul>
          </div>

          <div className="relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden animate-in fade-in slide-in-from-right-8 duration-1000 ease-out bg-subtle-background">
            <Image 
              src="/trade-detail-1.png" 
              alt="Trade Detail View" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto object-cover object-top"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
