// src/components/Navbar.tsx
import Link from 'next/link';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav>
      <Link href="/">메인</Link>
      {!user ? (
        <>
          <Link href="/auth/login">로그인</Link>
          <Link href="/auth/signup">회원 가입</Link>
        </>
      ) : (
        <>
            <Link href="/dashboard">대시보드</Link>
            <span>{user.email}</span>
        </>
      )}
    </nav>
  );
};

export default Navbar;
