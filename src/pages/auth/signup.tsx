// src/pages/auth/signup.tsx
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import useAuth from '../../hooks/useAuth';

interface User {
  email: string;
  password: string;
  nickname: string;
  color: string;
  userRole: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('user');
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData: User = {
        email: user.email || '',
        password,  // 실제로는 해시 처리된 비밀번호를 저장해야 합니다.
        nickname,
        color,
        userRole,
        uuid: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h1>회원 가입</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소 입력"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          required
        />
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 입력"
          required
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="색상 선택"
          required
        />
        <button type="submit">회원 가입하기</button>
      </form>
    </div>
  );
};

export default Signup;