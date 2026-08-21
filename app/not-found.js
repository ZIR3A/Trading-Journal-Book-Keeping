import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export const metadata = {
  title: 'Page Not Found — Trading Journal',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-primary">
            Page not found.
          </h1>
          <p className="text-secondary-text font-body">
            The page you're looking for doesn't exist or may have moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/" className={buttonVariants({ variant: 'outline', className: "w-full sm:w-auto rounded-none" })}>
            Back to Home
          </Link>
          <Link href="/product" className={buttonVariants({ variant: 'default', className: "w-full sm:w-auto rounded-none" })}>
            Explore the Product
          </Link>
        </div>
        
      </div>
    </div>
  );
}
