// frontend/src/pages/viewer/view.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import RoleGuard from '@/components/RoleGuard';
import axios from 'axios';
import Head from 'next/head';
import { Router } from 'next/router';

const ViewContentPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/content/posts`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setPosts(res.data);
            setError('');
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError(err.response?.data?.message || 'Failed to fetch posts');
        }
    };
    useEffect(() => {
        fetchPosts();
    }, [isAuthenticated, loading, user]);

    if (loading) return <div>Loading...</div>;

    return (
        <RoleGuard allowedRoles={['viewer', 'editor', 'admin']}>
            <Head>
                <title>Content Library | Viewer</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Explore Content</h1>

                {error && (
                    <div className="bg-red-100  text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div
                                key={post._id}
                                className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-6 border border-gray-200 flex flex-col justify-between"
                            >
                                <div>
                                    <h2
                                        className="text-xl font-semibold text-gray-900 truncate"
                                        title={post.title}
                                    >
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        By <span className="font-medium">{post.author?.username || 'Unknown'}</span> ·{' '}
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </p>

                                    <p className="text-gray-700 mt-3 text-sm line-clamp-3">
                                        {post.content}
                                    </p>
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        onClick={() =>
                                            alert(`Full Content of "${post.title}":\n\n${post.content}`)
                                        }
                                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white shadow rounded-lg text-gray-500">
                            No published content available.
                        </div>
                    )}
                </div>
            </div>
        </RoleGuard>
    );
};

export default ViewContentPage;