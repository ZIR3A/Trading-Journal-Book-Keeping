'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function OnboardingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || '');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // If unauthenticated, redirect to login
  if (status === 'unauthenticated') {
    router.replace('/login');
    return null;
  }

  // If already onboarded, redirect to dashboard
  if (status === 'authenticated' && session?.user?.onboardingCompleted) {
    router.replace('/dashboard');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Client-side validation
    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrors({ name: 'Name is required' });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, phone: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ form: data.message || 'An error occurred during onboarding.' });
        }
      } else {
        // Force session update to fetch the new `onboardingCompleted` state
        await update({ onboardingCompleted: true, profileCompleted: true });
        router.replace('/dashboard');
      }
    } catch (err) {
      setErrors({ form: 'A network error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="p-8 text-center text-sm text-secondary-text">Loading...</div>;
  }

  return (
    <div className="bg-card py-8 px-4 border border-border shadow-none sm:px-10 rounded-none w-full max-w-md mx-auto">
      <div className="mb-6 text-center space-y-2">
        <h3 className="text-xl font-medium tracking-tight text-primary">Complete Your Profile</h3>
        <p className="text-sm text-secondary-text">Please provide your details to continue</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {errors.form && (
          <div role="alert" className="p-3 border border-loss bg-loss/5 text-loss text-sm font-medium">
            {errors.form}
          </div>
        )}

        <div>
          <Label htmlFor="name">Name <span className="text-loss">*</span></Label>
          <div className="mt-2">
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className={`rounded-none ${errors.name ? 'border-loss' : ''}`}
            />
            {errors.name && <p className="mt-1 text-sm text-loss">{errors.name}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Phone (Optional)</Label>
          <div className="mt-2">
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              className={`rounded-none ${errors.phone ? 'border-loss' : ''}`}
            />
            {errors.phone && <p className="mt-1 text-sm text-loss">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full rounded-none" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Complete Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
}
