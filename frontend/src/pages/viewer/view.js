// frontend/src/pages/viewer/view.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import RoleGuard from '@/components/RoleGuard';
import axios from 'axios';
import Head from 'next/head';

const ViewContentPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    const fetchPosts = async () => {
        if (!isAuthenticated || loading) return;
        try {
            // Viewers should only see published posts, backend handles this logic as well
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content/posts`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setPosts(res.data);
            setError('');
        } catch (err) {
            console.error('Error fetching posts for viewer:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Failed to fetch content.');
            setPosts([]);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [isAuthenticated, loading, user]);

    if (loading) return <div>Loading...</div>;

    return (
        <RoleGuard allowedRoles={['viewer', 'editor', 'admin']}> {/* Admins and Editors can also view content */}
            <Head>
                <title>View Content - Viewer</title>
            </Head>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Available Content</h1>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
                                <p className="text-gray-600 text-sm mb-3">By: {post.author?.username || 'Unknown'} | Published: {new Date(post.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-700 text-base line-clamp-3">{post.content}</p> {/* Show a snippet */}
                                <div className="mt-4 text-right">
                                    <button
                                        onClick={() => alert(`Full Content of "${post.title}":\n\n${post.content}`)} // Replace with a modal for better UX
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full p-6 text-center text-gray-500 bg-white rounded-lg shadow-md">
                            No published content available.
                        </div>
                    )}
                </div>
            </div>
        </RoleGuard>
    );
};

export default ViewContentPage;