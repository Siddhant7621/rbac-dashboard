import { AuthProvider } from '../components/AuthProvider';
import Layout from '../components/Layout';
import '../styles/globals.css';

export const baseUrl= "http://localhost:5001";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;