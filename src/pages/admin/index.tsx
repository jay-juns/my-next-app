// src/pages/admin/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/auth/login');
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Welcome to the Admin Dashboard, {user?.email}!</div>;
};

export default AdminDashboard;
