import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROLES } from '../utils/constants';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === ROLES.ADMIN) {
        router.replace('/admin/users');
      } else if (user.role === ROLES.EDITOR) {
        router.replace('/editor/posts');
      } else if (user.role === ROLES.VIEWER) {
        router.replace('/viewer/view');
      } else  {
        router.replace('/');
      }
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="text-center mt-10 text-lg">Redirecting...</div>;
  }

  return null;
}
