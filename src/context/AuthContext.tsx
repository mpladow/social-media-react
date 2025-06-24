import type { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { supabase } from '../supabase-client';
import type { CreateAccountForm } from '../components/CreateAccount/CreateAccount';
import Avatar from '../components/common/Avatar';

interface AuthContextType {
  user: User | null;
  authMessage?: string;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUpWithEmail: (form: CreateAccountForm) => Promise<any>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [authMessage, setAuthMessage] = useState('');

  const getURL = () => {
    console.log('🚀 ~ getURL ~ import.meta.env?.NEXT_PUBLIC_SITE_URL:', import.meta.env?.NEXT_PUBLIC_SITE_URL);
    console.log('🚀 ~ getURL ~ import.meta.env?.NEXT_PUBLIC_VERCEL_URL:', import.meta.env?.NEXT_PUBLIC_VERCEL_URL);
    let url =
      import.meta.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      import.meta.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`;
    return url;
  };

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user || null);
      })
      .catch((error) => {
        setAuthMessage(`Error fetching session: ${error.message}`);
      });

    // when supabase auth state changes, we want to update the user state
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGithub = async () => {
    supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: getURL() } });
  };
  const signInWithEmail = async (email: string, password: string) => {
    supabase.auth.signInWithPassword({
      email,
      password,
    });
  };
  const signUpWithEmail = async (form: CreateAccountForm) => {
    console.log('🚀 ~ signUpWithEmail ~ form:', form);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          avatar_url: form.image ?? null,
          preferred_username: form.username ?? null,
        },
      },
    });
    if (error) {
      setAuthMessage(`Error signing up: ${error.message}`);
    }
    return data;
  };

  const signOut = async () => {
    setUser(null);
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, authMessage, signInWithGithub, signInWithEmail, signOut, signUpWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
