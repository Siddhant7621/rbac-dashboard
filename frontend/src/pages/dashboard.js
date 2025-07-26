import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/router';
import { ROLES } from '../utils/constants';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  if (user.role === ROLES.ADMIN) {
    router.push('/admin/users');
  } else if (user.role === ROLES.EDITOR) {
    router.push('/editor/posts');
  } else {
    router.push('/viewer/view');
  }

  return <div>Loading...</div>;
}