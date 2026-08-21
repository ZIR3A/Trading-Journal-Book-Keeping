import Image from 'next/image';

export function FeatureTradeJournal() {
  return (
    <section className="py-24 border-t border-border bg-subtle-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden animate-in fade-in slide-in-from-left-8 duration-1000 ease-out bg-subtle-background">
            <Image 
              src="/trade-entry-1.png" 
              alt="Trade Entry View" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto object-cover object-top"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6 max-w-lg lg:ml-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Record the trade. <br/> Capture the context.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              Document your trades and the reasoning behind them quickly. A trade record should explain exactly what happened from entry to exit.
            </p>
            <ul className="space-y-3 pt-4 border-t border-border/50">
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Entry and exit information
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Position sizing and risk details
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Setup context and reflections
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
