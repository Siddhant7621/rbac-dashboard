import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';

const RoleGuard = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    router.push('/');
    return null;
  }
  if (roles && !roles.includes(user.role)) {
    router.push('/dashboard');
    return null;
  }

  return children;
};

export default RoleGuard;