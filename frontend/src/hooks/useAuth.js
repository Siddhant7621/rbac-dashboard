// src/hooks/useAuth.js
import { useAuth as useAuthContext } from '../components/AuthProvider';

export const useAuth = () => {
  const context = useAuthContext();
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};