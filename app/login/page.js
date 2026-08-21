'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { CalendarView } from '@/components/calendar/calendar-view';
import Link from 'next/link';
import Image from 'next/image';

// Dummy data for the calendar preview
const generateDummyTrades = () => {
  const trades = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const d = (day) => new Date(year, month, day).toISOString();

  trades.push({ id: '1', date: d(2), status: 'closed', pnl: 150, symbol: 'AAPL', direction: 'long' });
  trades.push({ id: '2', date: d(4), status: 'closed', pnl: -45, symbol: 'TSLA', direction: 'short' });
  trades.push({ id: '3', date: d(5), status: 'closed', pnl: 210, symbol: 'MSFT', direction: 'long' });
  trades.push({ id: '4', date: d(5), status: 'closed', pnl: 50, symbol: 'NVDA', direction: 'long' });
  trades.push({ id: '5', date: d(8), status: 'closed', pnl: -120, symbol: 'AMD', direction: 'long' });
  trades.push({ id: '6', date: d(11), status: 'closed', pnl: 320, symbol: 'META', direction: 'long' });
  trades.push({ id: '7', date: d(14), status: 'closed', pnl: -55, symbol: 'TSLA', direction: 'short' });
  trades.push({ id: '8', date: d(15), status: 'closed', pnl: 180, symbol: 'GOOGL', direction: 'long' });
  trades.push({ id: '9', date: d(18), status: 'closed', pnl: 400, symbol: 'AMZN', direction: 'long' });
  trades.push({ id: '10', date: d(22), status: 'closed', pnl: -200, symbol: 'AAPL', direction: 'long' });
  trades.push({ id: '11', date: d(25), status: 'closed', pnl: 110, symbol: 'NFLX', direction: 'short' });

  return trades;
};

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const dummyTrades = useMemo(() => generateDummyTrades(), []);

  const handleGoogleLogin = async () => {
    setIsRedirecting(true);
    try {
      await login();
    } catch (err) {
      setIsRedirecting(false);
      console.error('Login failed', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* LEFT PANEL: PRODUCT EXPERIENCE */}
      <div className="w-full lg:w-[60%] bg-subtle-background border-r border-border p-6 sm:p-8 lg:p-12 flex flex-col overflow-hidden h-auto lg:h-screen">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity gap-3">
            <div className="rounded-[4px] overflow-hidden flex items-center justify-center shrink-0 w-10 h-10">
              <Image src="/images/brand-logo.png" alt="Trading Journal" width={40} height={40} className="object-cover w-full h-full" />
            </div>
            Trading Journal
          </Link>
        </div>
        
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-display font-semibold text-primary tracking-tight leading-tight mb-4">
            Record your trades.<br />
            Review your performance.<br />
            Build a history you can learn from.
          </h1>
          <p className="text-base text-secondary-text mb-8">
            Free trading journal for keeping your trading process organized.
          </p>
        </div>

        <div className="mt-auto hidden lg:block overflow-hidden relative">
          <div className="mb-3 inline-block px-3 py-1 bg-background border border-border text-xs font-mono uppercase tracking-wider text-secondary-text">
            Review your trading days
          </div>
          
          <div className="w-full max-w-4xl opacity-90 pointer-events-none transform origin-top-left scale-[0.80] xl:scale-[0.85] pb-10">
            <CalendarView trades={dummyTrades} />
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: AUTHENTICATION */}
      <div className="w-full lg:w-[40%] bg-background flex flex-col justify-center p-6 sm:p-12 lg:p-16 min-h-screen lg:min-h-0 relative">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          <div className="flex justify-start mb-2">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-primary transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </Link>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-primary">
              Welcome back
            </h2>
            <p className="text-secondary-text">
              Sign in to continue to your trading journal.
            </p>
          </div>

          <div className="pt-4 pb-4">
            <Button 
              type="button" 
              onClick={handleGoogleLogin} 
              disabled={isLoading || isRedirecting} 
              className="w-full h-12 rounded-none flex items-center justify-center gap-3 text-base font-medium"
              variant="default"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              {isRedirecting || isLoading ? 'Signing in...' : 'Continue with Google'}
            </Button>
          </div>

          <div className="space-y-6 pt-4 border-t border-border/50">
            <p className="text-sm text-secondary-text leading-relaxed">
              New here? Your account will be created automatically when you continue.
            </p>
            <p className="text-xs text-secondary-text/70 leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
