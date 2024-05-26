// src/pages/dashboard.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <h1>로그인 완료, {user?.email}님 환영합니다!</h1>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default Dashboard;
