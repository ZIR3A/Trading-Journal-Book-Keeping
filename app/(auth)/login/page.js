'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react'; // Example generic icon if no google icon exists

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

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
    <div className="bg-card py-10 px-4 border border-border shadow-none sm:px-10 rounded-none flex flex-col items-center">
      <div className="mb-6 text-center space-y-2">
        <h3 className="text-xl font-medium tracking-tight text-primary">Welcome to Trading Journal</h3>
        <p className="text-sm text-secondary-text">Log in or create an account to continue</p>
      </div>

      <div className="w-full">
        <Button 
          type="button" 
          onClick={handleGoogleLogin} 
          disabled={isLoading || isRedirecting} 
          className="w-full rounded-none flex items-center justify-center gap-2"
          variant="outline"
        >
          <LogIn className="h-4 w-4" />
          {isRedirecting ? 'Redirecting to Google...' : 'Continue with Google'}
        </Button>
      </div>
    </div>
  );
}
