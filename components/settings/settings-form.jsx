'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { settingsStore } from '@/lib/store/settings-store';
import { useRouter } from 'next/navigation';

export function SettingsForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    profileName: '',
    profileEmail: '',
    accountBalance: 10000,
    defaultRisk: 1,
    defaultRR: 2,
    defaultMarket: 'Forex'
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        // Load local trading defaults
        const localData = await settingsStore.getSettings();
        
        // Fetch authenticated backend profile
        const res = await fetch('/api/profile');
        if (res.ok) {
          const json = await res.json();
          const profile = json.data;
          
          setFormData({
            ...localData,
            profileName: profile.name || '',
            profileEmail: profile.email || '',
            profilePhone: profile.phone || '',
          });
        } else {
          setFormData(localData);
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = async () => {
    setIsLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    const data = await settingsStore.getSettings();
    setFormData(data);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    // Validation
    const balance = parseFloat(formData.accountBalance);
    const risk = parseFloat(formData.defaultRisk);
    const rr = parseFloat(formData.defaultRR);

    if (isNaN(balance) || balance <= 0) {
      setErrorMsg('Account Balance must be a positive number.');
      return;
    }
    if (isNaN(risk) || risk <= 0) {
      setErrorMsg('Default Risk must be a positive number.');
      return;
    }
    if (isNaN(rr) || rr <= 0) {
      setErrorMsg('Default R:R must be a positive number.');
      return;
    }

    setIsSaving(true);
    try {
      // 1. Save Trading Defaults Locally
      await settingsStore.saveSettings({
        ...formData,
        accountBalance: balance,
        defaultRisk: risk,
        defaultRR: rr
      });

      // 2. Save Profile Data to Backend
      const profileRes = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.profileName,
          phone: formData.profilePhone,
        }),
      });

      if (!profileRes.ok) {
        const errData = await profileRes.json();
        throw new Error(errData.message || 'Failed to update profile');
      }

      setSuccessMsg('Settings saved successfully.');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-secondary-text text-sm">Loading settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {successMsg && (
        <div className="p-4 border border-profit bg-profit/5 text-profit text-sm font-medium">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div role="alert" aria-live="assertive" className="p-4 border border-loss bg-loss/5 text-loss text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {/* Profile Settings */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="border-b border-border bg-subtle-background/50">
          <CardTitle className="text-lg font-display text-primary">Profile Information</CardTitle>
          <CardDescription className="text-secondary-text">Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="profileName">Name <span className="text-loss">*</span></Label>
              <Input 
                id="profileName" 
                name="profileName" 
                value={formData.profileName} 
                onChange={handleChange} 
                required
                className="rounded-none" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileEmail">Email (Managed by Google)</Label>
              <Input 
                type="email" 
                id="profileEmail" 
                name="profileEmail" 
                value={formData.profileEmail} 
                disabled
                className="rounded-none bg-muted text-muted-foreground" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePhone">Phone (Optional)</Label>
              <Input 
                type="tel" 
                id="profilePhone" 
                name="profilePhone" 
                value={formData.profilePhone || ''} 
                onChange={handleChange} 
                className="rounded-none" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Defaults */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="border-b border-border bg-subtle-background/50">
          <CardTitle className="text-lg font-display text-primary">Trading Defaults</CardTitle>
          <CardDescription className="text-secondary-text">
            These values will pre-fill the New Trade form. You can always override them per trade.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="accountBalance">Default Account Balance ($)</Label>
              <Input 
                type="number" 
                step="0.01" 
                id="accountBalance" 
                name="accountBalance" 
                value={formData.accountBalance} 
                onChange={handleChange} 
                className="rounded-none font-mono" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultRisk">Default Risk (%)</Label>
              <Input 
                type="number" 
                step="0.01" 
                id="defaultRisk" 
                name="defaultRisk" 
                value={formData.defaultRisk} 
                onChange={handleChange} 
                className="rounded-none font-mono" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultRR">Default Target R:R (1:X)</Label>
              <Input 
                type="number" 
                step="0.1" 
                id="defaultRR" 
                name="defaultRR" 
                value={formData.defaultRR} 
                onChange={handleChange} 
                className="rounded-none font-mono" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultMarket">Default Market</Label>
              <select 
                id="defaultMarket" 
                name="defaultMarket" 
                value={formData.defaultMarket} 
                onChange={handleChange} 
                className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Forex">Forex</option>
                <option value="Crypto">Crypto</option>
                <option value="Stocks">Stocks</option>
                <option value="Futures">Futures</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button 
          type="button" 
          variant="outline" 
          className="rounded-none" 
          onClick={handleReset} 
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="rounded-none" 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  );
}
