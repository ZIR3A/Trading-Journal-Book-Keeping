# Deployment & Operations Guide

This document outlines the production deployment strategy, environment configuration, observability setup, and backup procedures for the Trading Journal App.

## 1. Environment Strategy
The application operates on a simplified two-tier environment model:
- **Development**: Local environment utilizing a local `.env.local` containing development secrets and `localhost` configurations.
- **Production**: The live environment serving real users. Secrets are securely managed via the hosting platform's environment variable interface (e.g., Vercel Environment Variables, AWS Parameter Store).

## 2. Environment Variables
The following variables are required for the application to boot correctly in Production. Never commit these values to version control.

| Variable | Description | Security Level |
|----------|-------------|----------------|
| `MONGODB_URI` | MongoDB connection string (e.g., MongoDB Atlas) | **SECRET** |
| `NEXTAUTH_SECRET` | Cryptographic key used to encrypt session cookies (Generate via `openssl rand -base64 32`) | **SECRET** |
| `NEXTAUTH_URL` | The canonical production URL of the app (e.g., `https://mytradingjournal.com`) | Public |
| `GOOGLE_CLIENT_ID` | OAuth Client ID from Google Cloud Console | Public |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret from Google Cloud Console | **SECRET** |

## 3. Deployment Workflow (Vercel Example)
This application is optimized for Next.js App Router and deploys seamlessly to Vercel:
1. Connect the GitHub repository to a Vercel project.
2. In the Vercel Dashboard -> Settings -> Environment Variables, input all 5 variables listed above.
3. Vercel automatically detects the Next.js framework and executes `npm run build` natively.
4. Future commits to the `main` branch will automatically trigger immutable deployments.

## 4. Google OAuth Production Configuration
Before launch, the Google Cloud Console MUST be updated:
1. Navigate to **APIs & Services** > **Credentials**.
2. Under "Authorized JavaScript origins", add your production domain (e.g., `https://mytradingjournal.com`).
3. Under "Authorized redirect URIs", add `https://mytradingjournal.com/api/auth/callback/google`.
4. Ensure the OAuth consent screen is published if intended for public users.

## 5. Backups & Restoration (MongoDB Atlas)
- **Strategy**: Utilize MongoDB Atlas managed Cloud Backups.
- **Frequency**: Continuous cloud backups with Point-In-Time Recovery (PITR) enabled.
- **Restore Procedure**:
  1. Access the MongoDB Atlas Dashboard -> Data Services -> Clusters.
  2. Select **Restore** on the cluster.
  3. Choose the target cluster (preferably an isolated staging cluster to verify data integrity before overwriting production).
  4. Once restored and verified, switch the `MONGODB_URI` environment variable if you migrated to a new cluster.

## 6. Observability & Health
- **Health Endpoint**: The `/api/health` endpoint is publicly accessible and performs a live database ping. It is specifically designed NOT to leak the connection string on failure.
- **Logs**: Vercel runtime logs capture all `console.error` events, specifically wrapping API exceptions safely to prevent sensitive data exposure to the client.

## 7. Incident Response
**Database Outage**:
- **Symptom**: 503 errors on `/api/health`. Users cannot log in or save trades.
- **Action**: Verify MongoDB Atlas cluster status. If compromised, initiate a Point-In-Time restoration. Do NOT run undocumented schema migrations manually.

**Authentication Outage**:
- **Symptom**: Login loop or 500 errors during Google OAuth.
- **Action**: Verify `GOOGLE_CLIENT_SECRET` and `NEXTAUTH_SECRET` haven't expired or changed. Ensure the domain is strictly HTTPS.
