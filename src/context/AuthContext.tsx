import type { Provider, User } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { CreateAccountForm } from '../components/CreateAccount/CreateAccount';
import type { Role } from '../constants/roles';
import type { CustomJwtPayload } from '../models/customJwt';
import { supabase } from '../supabase-client';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  authMessage?: string;
  signInWithGithub: () => Promise<Provider>;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  signUpWithEmail: (form: CreateAccountForm) => Promise<any>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [authMessage, setAuthMessage] = useState('');

  const getURL = () => {
    console.log('🚀 ~ getURL ~ import.meta.env?.NEXT_PUBLIC_SITE_URL:', import.meta.env?.NEXT_PUBLIC_SITE_URL);
    console.log('🚀 ~ getURL ~ import.meta.env?.NEXT_PUBLIC_VERCEL_URL:', import.meta.env?.NEXT_PUBLIC_VERCEL_URL);
    let url =
      // import.meta.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      // import.meta.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:5174/';
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
        console.log('🚀 ~ .then ~ session:', session);
        setAuthMessage('');
        setUser(session?.user || null);
      })
      .catch((error) => {
        setAuthMessage(`Error fetching session: ${error.message}`);
      });

    // when supabase auth state changes, we want to update the user state
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        const jwt = jwtDecode<CustomJwtPayload>(session.access_token);
        setRole(jwt.user_role!);
      }
      setUser(session?.user || null);
      setAuthMessage('');
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: getURL() },
    });
    if (error) {
      setAuthMessage(`Error signing in with GitHub: ${error.message}`);
    }
    return data.provider;
  };
  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthMessage(`Error signing in: ${error.message}`);
    }
    return data.user;
  };

  const signUpWithEmail = async (form: CreateAccountForm) => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          avatar_url: form.image ?? null,
          preferred_username: form.username ?? null,
        },
        emailRedirectTo: `${getURL()}/verified`,
      },
    });
    if (error) {
      setAuthMessage(`Error signing up: ${error.message}`);
    }
    return data;
  };

  const signOut = async () => {
    setUser(null);
    setRole(null);
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, role, authMessage, signInWithGithub, signInWithEmail, signOut, signUpWithEmail }}
    >
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
