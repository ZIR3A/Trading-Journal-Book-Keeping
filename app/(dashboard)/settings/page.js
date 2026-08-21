'use client';

import { PageHeader } from '@/components/layout/page-header';
import { SettingsForm } from '@/components/settings/settings-form';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader 
        title="Settings" 
        description="Manage your profile and configure default trading preferences."
      />
      <SettingsForm />
    </div>
  );
}
