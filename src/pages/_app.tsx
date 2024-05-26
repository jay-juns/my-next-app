// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '../context/UserContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;