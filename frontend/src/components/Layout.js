import { useAuth } from './AuthProvider';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="h-[100vh] w-full max-w-screen-2xl border border-red-500 bg-gray-100">
      {user && <Navbar user={user} logout={logout} />}
      <main className="container mx-auto h-full w-full p-4">{children}</main>
    </div>
  );
};

export default Layout;