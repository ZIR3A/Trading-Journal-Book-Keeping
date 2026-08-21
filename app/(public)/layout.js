import { PublicNavbar } from '@/components/public/public-navbar';
import { PublicFooter } from '@/components/public/public-footer';

export const metadata = {
  title: 'Trading Journal — Trade with Intention. Review with Clarity.',
  description: 'A focused trading journal to record trades, review performance, and build better trading habits.',
  openGraph: {
    title: 'Trading Journal',
    description: 'A focused trading journal to record trades, review performance, and build better trading habits.',
    type: 'website',
  }
};

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1 w-full bg-background">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
