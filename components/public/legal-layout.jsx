import Link from 'next/link';

export function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-background py-16 md:py-24 animate-in fade-in duration-700 ease-out fill-mode-both">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        
        {/* Navigation Breadcrumb */}
        <nav className="mb-12">
          <Link href="/" className="text-sm font-medium text-secondary-text hover:text-primary transition-colors">
            &larr; Back to Home
          </Link>
        </nav>

        {/* Legal Header */}
        <header className="mb-12 space-y-4 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-primary tracking-tight">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm font-mono text-secondary-text">
              Last updated: {lastUpdated}
            </p>
          )}
        </header>

        {/* Legal Content */}
        <article className="prose prose-neutral dark:prose-invert prose-headings:font-display prose-headings:font-medium prose-p:font-body prose-a:text-primary hover:prose-a:text-primary/80 prose-li:font-body max-w-none text-secondary-text">
          {children}
        </article>
        
        {/* Sub-Navigation */}
        <div className="mt-24 pt-8 border-t border-border flex flex-wrap gap-6">
          <Link href="/privacy" className="text-sm font-medium text-secondary-text hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm font-medium text-secondary-text hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/disclaimer" className="text-sm font-medium text-secondary-text hover:text-primary transition-colors">
            Trading Disclaimer
          </Link>
        </div>

      </div>
    </div>
  );
}
