import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
        
      await login(email, password);
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="  max-h-5xl w-full flex items-center justify-center -50 px-4">
      <div className=" flex justify-center items-center flex-col w-[90%] max-w-5xl bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit} className="  w-[60%] flex justify-center items-center flex-col gap-4">
          <div className='w-full'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div className='w-full'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-blue-600 hover:text-blue-800 font-medium transition"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );

}