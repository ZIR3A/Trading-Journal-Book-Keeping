import Image from 'next/image';

export function FeaturePerformance() {
  return (
    <section className="py-24 border-t border-border bg-subtle-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
            Turn your history into useful information.
          </h2>
          <p className="mt-4 text-secondary-text text-lg">
            Review your aggregated trading information to find recurring patterns and statistics that help you understand your edge.
          </p>
        </div>

          <div className="relative rounded border border-border shadow-xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-start justify-center overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out bg-subtle-background">
            <Image 
              src="/analytics-1.png" 
              alt="Trading Analytics Dashboard" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto object-cover object-top"
            />
          </div>

      </div>
    </section>
  );
}
