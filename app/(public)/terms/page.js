import { LegalLayout } from '@/components/public/legal-layout';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Trading Journal',
  description: 'Terms and conditions for using the Trading Journal application.',
  openGraph: {
    title: 'Terms of Service — Trading Journal',
    description: 'Terms and conditions for using the Trading Journal application.',
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      
      <h3>1. Acceptance</h3>
      <p>
        By accessing and using the Trading Journal App, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
      </p>

      <h3>2. Description of the Service</h3>
      <p>
        The Trading Journal App provides a personal journaling, organizational, and analytical tool designed to help traders record their trading history. The Service does not execute trades, manage funds, or provide financial advice.
      </p>

      <h3>3. Accounts</h3>
      <p>
        You are responsible for maintaining the security of your authentication credentials (such as your Google account) used to access the application. You are responsible for all activities that occur under your account.
      </p>

      <h3>4. Acceptable Use</h3>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for any unlawful purpose.</li>
        <li>Attempt to gain unauthorized access to other users' accounts or data.</li>
        <li>Interfere with or disrupt the operation of the Service.</li>
        <li>Use automated scripts or scraping tools to extract data from the Service without permission.</li>
      </ul>

      <h3>5. User Content</h3>
      <p>
        You retain ownership of the trading data, journal entries, and notes you create within the application. By using the Service, you grant us the necessary permissions to store, process, and display this data strictly to provide the Service to you.
      </p>

      <h3>6. Service Availability</h3>
      <p>
        While we strive for high reliability, we do not guarantee that the Service will be uninterrupted, error-free, or available at all times. We reserve the right to modify, suspend, or discontinue the Service (or any part of it) at any time.
      </p>

      <h3>7. Disclaimer of Warranties</h3>
      <p>
        The Service is provided "as is" and "as available". We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of any analytics or features provided by the application. Please review our <Link href="/disclaimer">Trading Disclaimer</Link> for important information regarding financial risk.
      </p>

      <h3>8. Changes to the Terms</h3>
      <p>
        We may update these Terms of Service from time to time. Continued use of the Service after changes are made constitutes acceptance of the new terms.
      </p>

    </LegalLayout>
  );
}
