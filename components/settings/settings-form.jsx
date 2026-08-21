'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { settingsStore } from '@/lib/store/settings-store';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { normalizeError } from '@/lib/utils/errors';

// ─── Shared UI Primitives ─────────────────────────────────────────────────────

function SectionFeedback({ success, error }) {
  if (success) return (
    <p role="status" className="text-sm text-profit font-medium">{success}</p>
  );
  if (error) return (
    <p role="alert" aria-live="assertive" className="text-sm text-loss font-medium">{error}</p>
  );
  return null;
}

function SettingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2].map(i => (
        <div key={i} className="border border-border">
          <div className="border-b border-border bg-subtle-background/50 px-6 py-4">
            <div className="h-5 w-40 bg-secondary" />
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map(j => (
              <div key={j} className="space-y-2">
                <div className="h-3 w-24 bg-secondary" />
                <div className="h-10 w-full bg-secondary" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReadOnlyField({ label, value, hint }) {
  return (
    <div className="space-y-2">
      <Label className="text-secondary-text">{label}</Label>
      <div className="h-10 flex items-center px-3 border border-input bg-muted text-muted-foreground text-sm font-mono">
        {value || '—'}
      </div>
      {hint && <p className="text-xs text-secondary-text">{hint}</p>}
    </div>
  );
}

// ─── Profile Section ──────────────────────────────────────────────────────────

function ProfileSection({ initialProfile }) {
  const { update: updateSession } = useSession();
  const [form, setForm] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ success: '', error: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  // Keep form in sync if parent re-loads profile
  useEffect(() => { setForm(initialProfile); }, [initialProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }));
    setStatus({ success: '', error: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ success: '', error: '' });
    setFieldErrors({});

    // Client-side validation
    const trimmedName = form.profileName?.trim();
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      setFieldErrors({ profileName: 'Name must be between 2 and 100 characters.' });
      return;
    }
    const trimmedPhone = form.profilePhone?.trim() || '';
    if (trimmedPhone && trimmedPhone.length > 20) {
      setFieldErrors({ profilePhone: 'Phone number is too long.' });
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, phone: trimmedPhone }),
      });

      const json = await res.json();
      if (!res.ok) {
        if (json.errors) setFieldErrors(json.errors);
        throw new Error(json.message || 'Failed to update profile.');
      }

      // Refresh the JWT so the TopHeader avatar/name reflects the change immediately
      await updateSession({ name: trimmedName });
      toast.success('Profile updated.');
    } catch (err) {
      toast.error(normalizeError(err));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50">
        <CardTitle className="text-lg font-display text-primary">Profile Information</CardTitle>
        <CardDescription className="text-secondary-text">Update your personal details.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSave} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="profileName">
                Name <span className="text-loss" aria-hidden="true">*</span>
              </Label>
              <Input
                id="profileName"
                name="profileName"
                value={form.profileName}
                onChange={handleChange}
                autoComplete="name"
                required
                aria-required="true"
                aria-describedby={fieldErrors.profileName ? 'profileName-error' : undefined}
                className="rounded-none"
              />
              {fieldErrors.profileName && (
                <p id="profileName-error" role="alert" className="text-xs text-loss">
                  {fieldErrors.profileName}
                </p>
              )}
            </div>

            <ReadOnlyField
              label="Email"
              value={form.profileEmail}
              hint="Managed by Google. Contact Google to change your email address."
            />

            <div className="space-y-2">
              <Label htmlFor="profilePhone">
                Phone <span className="text-secondary-text text-xs font-normal">(optional)</span>
              </Label>
              <Input
                id="profilePhone"
                name="profilePhone"
                type="tel"
                value={form.profilePhone || ''}
                onChange={handleChange}
                autoComplete="tel"
                aria-describedby={fieldErrors.profilePhone ? 'profilePhone-error' : undefined}
                className="rounded-none"
              />
              {fieldErrors.profilePhone && (
                <p id="profilePhone-error" role="alert" className="text-xs text-loss">
                  {fieldErrors.profilePhone}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end pt-2 border-t border-border">
            <Button type="submit" className="rounded-none ml-auto" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Trading Preferences Section ──────────────────────────────────────────────

function TradingPreferencesSection({ initialPrefs }) {
  const [form, setForm] = useState(initialPrefs);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ success: '', error: '' });

  useEffect(() => { setForm(initialPrefs); }, [initialPrefs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setStatus({ success: '', error: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ success: '', error: '' });

    const balance = parseFloat(form.accountBalance);
    const risk = parseFloat(form.defaultRisk);
    const rr = parseFloat(form.defaultRR);

    if (isNaN(balance) || balance <= 0) {
      setStatus({ success: '', error: 'Account Balance must be a positive number.' });
      return;
    }
    if (isNaN(risk) || risk <= 0 || risk > 100) {
      setStatus({ success: '', error: 'Default Risk must be between 0 and 100.' });
      return;
    }
    if (isNaN(rr) || rr <= 0) {
      setStatus({ success: '', error: 'Default R:R must be a positive number.' });
      return;
    }

    setIsSaving(true);
    try {
      await settingsStore.saveSettings({
        ...form,
        accountBalance: balance,
        defaultRisk: risk,
        defaultRR: rr,
      });
      toast.success('Trading preferences saved.');
    } catch (err) {
      toast.error(normalizeError(err));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50">
        <CardTitle className="text-lg font-display text-primary">Trading Preferences</CardTitle>
        <CardDescription className="text-secondary-text">
          These values pre-fill the New Trade form. Each individual trade can use different values.
          Changing these preferences does not modify existing trades.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSave} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="accountBalance">Account Balance ($)</Label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                id="accountBalance"
                name="accountBalance"
                value={form.accountBalance}
                onChange={handleChange}
                className="rounded-none font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultRisk">Default Risk (%)</Label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                max="100"
                id="defaultRisk"
                name="defaultRisk"
                value={form.defaultRisk}
                onChange={handleChange}
                className="rounded-none font-mono"
              />
              <p className="text-xs text-secondary-text">
                Used as the starting value when opening a new trade.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultRR">Default Target R:R (1 : X)</Label>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                id="defaultRR"
                name="defaultRR"
                value={form.defaultRR}
                onChange={handleChange}
                className="rounded-none font-mono"
              />
              <p className="text-xs text-secondary-text">
                Used as the starting value when opening a new trade.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultMarket">Default Market</Label>
              <select
                id="defaultMarket"
                name="defaultMarket"
                value={form.defaultMarket}
                onChange={handleChange}
                className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="Forex">Forex</option>
                <option value="Crypto">Crypto</option>
                <option value="Stocks">Stocks</option>
                <option value="Futures">Futures</option>
                <option value="Indices">Indices</option>
                <option value="Commodities">Commodities</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2 border-t border-border">
            <Button type="submit" className="rounded-none ml-auto" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Account Section ──────────────────────────────────────────────────────────

function AccountSection({ profile }) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50">
        <CardTitle className="text-lg font-display text-primary">Account</CardTitle>
        <CardDescription className="text-secondary-text">
          Your account information and session management.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReadOnlyField
            label="Account Email"
            value={profile.profileEmail}
            hint="Your identity is verified through Google."
          />
        </div>

        {/* Session block */}
        <div className="border border-border pt-5 pb-4 px-5">
          <p className="text-xs font-mono uppercase tracking-wider text-secondary-text mb-4">Session</p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-primary font-medium">Sign Out</p>
              <p className="text-xs text-secondary-text mt-1">
                End your current session and return to the login page.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-none text-sm shrink-0"
              onClick={handleSignOut}
              disabled={isSigningOut}
              aria-label="Sign out of your account"
            >
              {isSigningOut ? 'Signing out...' : 'Sign Out'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Root Settings Form ───────────────────────────────────────────────────────

export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [profile, setProfile] = useState({
    profileName: '',
    profileEmail: '',
    profilePhone: '',
  });

  const [prefs, setPrefs] = useState({
    accountBalance: 10000,
    defaultRisk: 1,
    defaultRR: 2,
    defaultMarket: 'Forex',
  });

  useEffect(() => {
    async function loadAll() {
      try {
        const [localData, profileRes] = await Promise.all([
          settingsStore.getSettings(),
          fetch('/api/profile'),
        ]);

        setPrefs({
          accountBalance: localData.accountBalance ?? 10000,
          defaultRisk: localData.defaultRisk ?? 1,
          defaultRR: localData.defaultRR ?? 2,
          defaultMarket: localData.defaultMarket ?? 'Forex',
        });

        if (profileRes.ok) {
          const json = await profileRes.json();
          const p = json.data;
          setProfile({
            profileName: p.name || '',
            profileEmail: p.email || '',
            profilePhone: p.phone || '',
          });
        }
      } catch (e) {
        console.error('Failed to load settings', e);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadAll();
  }, []);

  if (isLoading) return <SettingSkeleton />;

  if (loadError) {
    return (
      <div className="border border-border p-8 text-center space-y-3">
        <p className="text-sm text-primary font-medium">We couldn&apos;t load your settings.</p>
        <p className="text-sm text-secondary-text">Please refresh the page to try again.</p>
        <Button variant="outline" className="rounded-none" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProfileSection initialProfile={profile} />
      <TradingPreferencesSection initialPrefs={prefs} />
      <AccountSection profile={profile} />
    </div>
  );
}
