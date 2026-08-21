'use client';

import { AppShell } from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingState } from '@/components/shared/loading-state';

export default function DashboardLayout({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (!user.onboardingCompleted) {
        router.push('/onboarding');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <LoadingState text="Verifying session..." />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
