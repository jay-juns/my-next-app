// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

interface AuthHook {
  user: FirebaseUser | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const useAuth = (): AuthHook => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const fetchUserRole = async (user: FirebaseUser) => {
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data()?.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      setIsAdmin(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
    router.push('/auth/login');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        await fetchUserRole(user);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user && router.pathname !== '/auth/login' && router.pathname !== '/auth/signup') {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  return { user, loading, isAdmin, logout };
};

export default useAuth;
