import type { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { supabase } from '../supabase-client';

interface AuthContextType {
  user: User | null;
  authMessage?: string;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // when supabase auth state changes, we want to update the user state
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
	 return () => {
		listener.subscription.unsubscribe();
	 }
  }, []);

  const signInWithGithub = async () => {
    supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  const signOut = async () => {
    setUser(null);
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, authMessage, signInWithGithub, signOut }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
