'use client';

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSuccess(true);
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="bg-card py-8 px-4 border border-border shadow-none sm:px-10 rounded-none text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-profit mb-4" />
        <h3 className="text-lg font-semibold text-primary">Check your email</h3>
        <p className="mt-2 text-sm text-secondary-text mb-6">
          We have sent a password reset link to {email}.
        </p>
        <Link href="/login" className={buttonVariants({ className: "w-full rounded-none" })}>Return to sign in</Link>
      </div>
    );
  }

  return (
    <div className="bg-card py-8 px-4 border border-border shadow-none sm:px-10 rounded-none">
      <div className="mb-6">
        <p className="text-sm text-secondary-text text-center">
          Enter your email address and we will send you a link to reset your password.
        </p>
      </div>

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

        {error && (
          <div className="text-sm text-destructive font-medium">
            {error}
          </div>
        )}

        <div>
          <Button type="submit" className="w-full rounded-none" disabled={isLoading}>
            {isLoading ? 'Sending link...' : 'Send reset link'}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-secondary-text">
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
