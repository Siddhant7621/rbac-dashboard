import { useAuth } from './AuthProvider';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Navbar user={user} logout={logout} />}
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;