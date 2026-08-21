import { LegalLayout } from '@/components/public/legal-layout';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Trading Journal',
  description: 'Understand what information Trading Journal collects, how it is used, and how it is stored.',
  openGraph: {
    title: 'Privacy Policy — Trading Journal',
    description: 'Understand what information Trading Journal collects, how it is used, and how it is stored.',
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      
      <h3>1. Introduction</h3>
      <p>
        This Privacy Policy explains what information the Trading Journal App collects, how it is used, and how it is protected. The application is designed to function as a personal trading journal and analysis tool. We believe in collecting only the information necessary to provide this service.
      </p>

      <h3>2. Information We Collect</h3>
      <p>We collect information strictly necessary to operate the application:</p>
      <ul>
        <li>
          <strong>Authentication Information:</strong> We use Google Authentication to secure your account. When you log in, we receive your email address, name, and profile picture from Google. We do not receive or store your Google password.
        </li>
        <li>
          <strong>Trading & Journal Information:</strong> We store the trades, setups, notes, risk configurations, and journaling entries that you create within the application.
        </li>
        <li>
          <strong>Profile Information:</strong> We store the profile settings and onboarding preferences you explicitly configure within the application.
        </li>
      </ul>

      <h3>3. How We Use Information</h3>
      <p>Your information is used exclusively to provide the Trading Journal service:</p>
      <ul>
        <li>To authenticate your access to the application.</li>
        <li>To store and display your trading records and journal entries.</li>
        <li>To calculate performance analytics based on your trade history.</li>
        <li>To maintain the security and reliability of the application.</li>
      </ul>
      <p>We do not use your trading data to train public market-prediction algorithms, and we do not use your data to provide trading signals to others.</p>

      <h3>4. How Information Is Stored</h3>
      <p>
        Your information is stored in a secure database infrastructure. We take reasonable measures to protect account and application data against unauthorized access. Your trading data is tied specifically to your authenticated user account and is not exposed publicly.
      </p>

      <h3>5. Third-Party Services</h3>
      <p>We rely on essential third-party services to operate the application:</p>
      <ul>
        <li><strong>Google:</strong> Used strictly as an authentication provider (OAuth).</li>
        <li><strong>Database Providers:</strong> Used to securely store application data.</li>
      </ul>
      <p>We do not sell your personal information or trading data to third parties.</p>

      <h3>6. Account Deletion</h3>
      <p>
        You retain control over your data. If you wish to delete your account and all associated trading history, you may do so through your account settings or by contacting the application administrator. Deleting your account permanently removes your journal entries and trade history from our active databases.
      </p>

      <h3>7. Changes to this Policy</h3>
      <p>
        We may update this policy as the application evolves. Significant changes will be communicated through the application or via the email address associated with your account.
      </p>

    </LegalLayout>
  );
}
