import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section className="py-32 md:py-48 text-center border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-primary leading-tight">
          Start building a better trading journal.
        </h2>
        <p className="mt-8 text-lg md:text-xl text-secondary-text max-w-2xl mx-auto">
          Record your trades. Review your decisions. Build a process you can trust.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className={buttonVariants({ variant: 'default', size: 'lg', className: "w-full sm:w-auto rounded-none px-12" })}>
            Start Journaling
          </Link>
          <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'lg', className: "w-full sm:w-auto rounded-none px-12 bg-transparent" })}>
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
}
