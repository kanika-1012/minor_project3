import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  sendOTP: (email: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Signed in successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      if (!email.endsWith('@kiit.ac.in')) {
        throw new Error('Only KIIT email addresses are allowed');
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Create user profile
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          user_id: (await supabase.auth.getUser()).data.user?.id,
          full_name: userData.fullName,
          year_of_study: userData.yearOfStudy,
          stream: userData.stream,
          branch: userData.branch,
        },
      ]);

      if (profileError) throw profileError;
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const sendOTP = async (email: string) => {
    try {
      if (!email.endsWith('@kiit.ac.in')) {
        throw new Error('Only KIIT email addresses are allowed');
      }

      // In a real implementation, you would generate and send an OTP via email
      // For demo purposes, we'll use a mock OTP system
      localStorage.setItem('mockOTP', '123456');
      toast.success('OTP sent to your email!');
      return true;
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    // For demo purposes, we'll verify against the mock OTP
    const mockOTP = localStorage.getItem('mockOTP');
    if (otp === mockOTP) {
      localStorage.removeItem('mockOTP');
      toast.success('OTP verified successfully!');
      return true;
    }
    toast.error('Invalid OTP');
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        sendOTP,
        verifyOTP,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}