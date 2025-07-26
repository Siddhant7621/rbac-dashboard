import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import RoleGuard from '@/components/RoleGuard';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router'; 

const SystemLogsPage = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchLogs = async () => {
        try {
            console.log('Fetching logs...');
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.log('No token found');
                setError('Authentication required');
                setLoading(false);
                return;
            }

            console.log('Using token:', token);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs`, {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });
            
            console.log('Logs data received:', res.data);
            setLogs(res.data);
            setError('');
        } catch (err) {
            console.error('Error fetching logs:', err);
            setError(err.response?.data?.message || 'Failed to fetch system logs');
            setLogs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch logs if we have a user (authenticated)
        if (user) {
            fetchLogs();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;

    return (
        <RoleGuard allowedRoles={['admin']}>
            <Head>
                <title>System Logs - Admin</title>
            </Head>
            
            <div className="container mx-auto p-4">
                 <div className="flex justify-between items-center mb-4"> {/* Changed to flex layout */}
                    <h1 className="text-2xl font-bold">System Logs</h1>
                    <button
                        onClick={() => router.push('/admin/users')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Back to User Management
                    </button>
                </div>
                
                {error && <div className="bg-red-100 p-3 rounded mb-4">{error}</div>}
                
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Timestamp</th>
                                <th className="p-3 text-left">User</th>
                                <th className="p-3 text-left">Action</th>
                                <th className="p-3 text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length > 0 ? (
                                logs.map(log => (
                                    <tr key={log._id} className="border-t hover:bg-gray-50">
                                        <td className="p-3">{new Date(log.timestamp).toLocaleString()}</td>
                                        <td className="p-3">{log.username || 'System'}</td>
                                        <td className="p-3">{log.action}</td>
                                        <td className="p-3">{log.details}</td>
                                    </tr>
                                ))
                            ) : !error && (
                                <tr>
                                    <td colSpan="4" className="p-3 text-center">
                                        No logs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </RoleGuard>
    );
};

export default SystemLogsPage;