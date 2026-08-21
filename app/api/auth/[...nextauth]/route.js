import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectToDatabase from '@/lib/db/mongoose';
import { User } from '@/lib/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          await connectToDatabase();

          // Ensure stable identity logic: Find by providerAccountId
          const existingUser = await User.findOne({
            provider: 'google',
            providerAccountId: account.providerAccountId,
          });

          if (existingUser) {
            // Existing user; preserve existing application profile/data
            return true;
          }

          // New User
          await User.create({
            provider: 'google',
            providerAccountId: account.providerAccountId,
            email: user.email,
            emailVerified: profile.email_verified || false,
            name: user.name || '',
            avatar: user.image || '',
            profileCompleted: false,
            onboardingCompleted: false,
          });

          return true;
        } catch (error) {
          console.error('Error during Google sign in:', error);
          // Return false to reject authentication if DB fails
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, user, trigger, session }) {
      // Initially, when signing in, fetch the MongoDB user ID
      if (account && user) {
        await connectToDatabase();
        const dbUser = await User.findOne({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        if (dbUser) {
          token.userId = dbUser._id.toString();
          token.name = dbUser.name || '';
          token.profileCompleted = dbUser.profileCompleted;
          token.onboardingCompleted = dbUser.onboardingCompleted;
        }
      }

      // Handle explicit session updates (e.g., after onboarding or profile name change)
      if (trigger === 'update' && session) {
        if (session.onboardingCompleted !== undefined) {
          token.onboardingCompleted = session.onboardingCompleted;
        }
        if (session.profileCompleted !== undefined) {
          token.profileCompleted = session.profileCompleted;
        }
        // Allow the settings form to propagate a name change without full re-login
        if (session.name !== undefined) {
          token.name = session.name;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Inject minimal required info into the session payload
      if (token && session.user) {
        session.user.id = token.userId;
        session.user.profileCompleted = token.profileCompleted;
        session.user.onboardingCompleted = token.onboardingCompleted;
        // Propagate name from JWT so profile updates reflect without re-login
        if (token.name) session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // Redirect here if auth fails or requires login
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
