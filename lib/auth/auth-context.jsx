'use client';

import { createContext, useContext } from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';

// The context remains for backward compatibility with components that import it directly.
const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
});

// Inner provider that maps NextAuth session state to the legacy AuthContext shape
function AuthStateProvider({ children }) {
  const { data: session, status } = useSession();

  const user = session?.user ? {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    avatar: session.user.image,
    profileCompleted: session.user.profileCompleted,
    onboardingCompleted: session.user.onboardingCompleted,
  } : null;

  const isLoading = status === 'loading';

  const login = async () => {
    // Triggers NextAuth Google login flow
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const logout = async () => {
    // Triggers NextAuth logout flow
    await signOut({ callbackUrl: '/' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <AuthStateProvider>{children}</AuthStateProvider>
    </SessionProvider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
