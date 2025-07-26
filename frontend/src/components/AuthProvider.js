import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        
        const { data } = await api.get('/api/auth/me');
        setUser(data);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
  try {
    const { data } = await api.post('/api/auth/login', { email, password });
    console.log("Login response:", data);

    localStorage.setItem('token', data.token);
    setUser(data.user);

    // Redirect based on role
    if (data.user.role === 'admin') {
      router.push('/admin/user');
    } else {
      router.push('/dashboard');
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
  }
};
  const register = async (userData) => {
    const { data } = await api.post('/api/auth/register', userData);
    localStorage.setItem('token', data.token);
    console.log("au",data.token)
    setUser(data.user);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);