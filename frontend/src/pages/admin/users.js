import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import RoleGuard from '@/components/RoleGuard';
import axios from 'axios';
import Head from 'next/head';
import { baseUrl } from '../_app';
import { useRouter } from 'next/router'; 
const UserManagementPage = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const router = useRouter();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            console.log('Attempting to fetch users...');
            const token = localStorage.getItem('token');
            console.log('Using token:', token);
            
            const res = await axios.get(`${baseUrl}/api/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            console.log('Users data received:', res.data);
            setUsers(res.data);
            setError('');
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.response?.data?.message || 'Failed to fetch users');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUsers();
        }
    }, [user]);

    const handleRoleChange = async (userId, newRole) => {
        if (!confirm(`Change role to ${newRole}?`)) return;
        
        try {
            const res = await axios.put(
                `${baseUrl}/api/users/${userId}/role`,
                { role: newRole },
                {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token')}` 
                    }
                }
            );
            setMessage('Role updated successfully');
            fetchUsers();
        } catch (err) {
            console.error('Error updating role:', err);
            setError(err.response?.data?.message || 'Failed to update role');
        }
    };

    const handleDeleteUser = async (userId, username) => {
        if (!confirm(`Delete user ${username}?`)) return;
        
        try {
            await axios.delete(`${baseUrl}/api/users/${userId}`, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                }
            });
            setMessage('User deleted successfully');
            fetchUsers();
        } catch (err) {
            console.error('Error deleting user:', err);
            setError(err.response?.data?.message || 'Failed to delete user');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <RoleGuard allowedRoles={['admin']}>
            <Head>
                <title>User Management</title>
            </Head>
            
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <button
                        onClick={() => router.push('/admin/logs')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        View System Logs
                    </button>
                </div>
                
                {error && <div className="bg-red-100 p-3 rounded mb-4">{error}</div>}
                {message && <div className="bg-green-100 p-3 rounded mb-4">{message}</div>}
                
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Username</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(u => (
                                    <tr key={u._id} className="border-t">
                                        <td className="p-3">{u.username}</td>
                                        <td className="p-3">{u.email}</td>
                                        <td className="p-3 capitalize">{u.role}</td>
                                        <td className="p-3">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                className="mr-2 p-1 border rounded"
                                                disabled={u._id === user?._id}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="editor">Editor</option>
                                                <option value="viewer">Viewer</option>
                                            </select>
                                            <button
                                                onClick={() => handleDeleteUser(u._id, u.username)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                disabled={u._id === user?._id}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-3 text-center">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </RoleGuard>
    );
};

export default UserManagementPage;