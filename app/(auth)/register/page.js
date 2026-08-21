'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setError('Registration is currently disabled in the static preview.');
    setIsLoading(false);
  };

  return (
    <div className="bg-card py-8 px-4 border border-border shadow-none sm:px-10 rounded-none">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-2">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="rounded-none"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-2">
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="rounded-none"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="mt-2">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className="rounded-none"
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-destructive font-medium">
            {error}
          </div>
        )}

        <div>
          <Button type="submit" className="w-full rounded-none" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-secondary-text">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
