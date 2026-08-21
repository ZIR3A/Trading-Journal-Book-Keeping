import Link from 'next/link';
import Image from 'next/image';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-12">
        
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-sm">
          <span className="font-display font-semibold text-lg tracking-tight text-primary flex items-center gap-3">
            <div className="rounded-[4px] overflow-hidden flex items-center justify-center shrink-0">
              <Image src="/images/brand-logo.png" alt="Trading Journal logo" width={48} height={48} className="object-cover w-full h-full" />
            </div>
            Trading Journal
          </span>
          <p className="text-sm text-secondary-text leading-relaxed">
            A focused trading journal to record trades, review performance, and build better trading habits.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-primary">Product</h4>
            <Link href="/product" className="text-sm text-secondary-text hover:text-primary transition-colors">Product Details</Link>
            <Link href="/how-it-works" className="text-sm text-secondary-text hover:text-primary transition-colors">How It Works</Link>
            <Link href="/about" className="text-sm text-secondary-text hover:text-primary transition-colors">About</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-primary">Legal</h4>
            <Link href="/privacy" className="text-sm text-secondary-text hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-secondary-text hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="text-sm text-secondary-text hover:text-primary transition-colors">Trading Disclaimer</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-primary">Application</h4>

            <Link href="/login" className="text-sm text-secondary-text hover:text-primary transition-colors">Start Journaling</Link>
          </div>

        </div>

      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {currentYear} Trading Journal. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built for traders who review.
        </p>
      </div>
    </footer>
  );
}
