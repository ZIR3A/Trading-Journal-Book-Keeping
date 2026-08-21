import Image from 'next/image';

export function FeatureOrganization() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative rounded border border-border shadow-xl h-[400px] flex items-start justify-center overflow-hidden animate-in fade-in slide-in-from-left-8 duration-1000 ease-out bg-subtle-background">
            <Image 
              src="/trade-history-5.png" 
              alt="Trade History View" 
              width={1920}
              height={1080}
              className="w-[102%] max-w-none h-auto object-cover object-top"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6 max-w-lg lg:ml-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Find the trades that matter.
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed">
              Structured records make your historical trades easy to navigate. Stop digging through disconnected spreadsheets.
            </p>
            <ul className="space-y-3 pt-4 border-t border-border/50">
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Filter by symbol and direction
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Searchable history
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Organized timeline of events
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
