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
        router.replace('/admin/users').then(() => {
      window.location.reload(); // force re-render with new context
    });
      } else if (user.role === ROLES.EDITOR) {
        router.replace('/editor/posts').then(() => {
      window.location.reload(); // force re-render with new context
    });
      } else {
        router.replace('/viewer/view').then(() => {
      window.location.reload(); // force re-render with new context
    });
      }
    }
  }, [user, loading]);

  if (loading) return <div className="text-center mt-10 text-gray-600 text-lg">Loading your dashboard...</div>;

  return <div className="text-center mt-10 text-gray-600 text-lg">Redirecting to your dashboard...</div>;
}
