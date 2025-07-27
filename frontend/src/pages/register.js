import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/router';
import { ROLE_OPTIONS } from '../utils/constants';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'viewer',
  });
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      await register(formData);
    } catch (error) {
      alert('Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
  <div className="max-w-md mx-auto mt-16 px-6 h-full border border-red-300 py-8 bg-white rounded-2xl shadow-xl">
    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create an Account</h2>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 font-medium"
      >
        Register
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{' '}
      <button
        onClick={() => router.push('/')}
        className="text-blue-600 hover:underline font-medium"
      >
        Login here
      </button>
    </p>
  </div>
);

}