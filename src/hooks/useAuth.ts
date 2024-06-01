// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';

interface AuthHook {
  user: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const useAuth = (): AuthHook => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user && router.pathname !== '/auth/login' && router.pathname !== '/auth/signup') {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/auth/login');
  };

  return { user, loading, logout };
};

export default useAuth;