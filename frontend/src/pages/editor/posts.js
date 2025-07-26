// frontend/src/pages/editor/posts.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import RoleGuard from '@/components/RoleGuard';
import axios from 'axios';
import Head from 'next/head';

const ContentManagementPage = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('draft');
    const [editingPost, setEditingPost] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

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
        if (user) fetchPosts();
    }, [user]);

    const resetForm = () => {
        setTitle('');
        setContent('');
        setStatus('draft');
        setEditingPost(null);
        setError('');
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            if (editingPost) {
                // Update existing post
                await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/content/posts/${editingPost._id}`, 
                    { title, content, status },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                setMessage('Post updated successfully!');
            } else {
                // Create new post - no need to send author as backend handles it
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/content/posts`, 
                    { title, content, status },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                setMessage('Post created successfully!');
            }
            fetchPosts();
            resetForm();
        } catch (err) {
            console.error('Error saving post:', err);
            setError(err.response?.data?.message || 'Failed to save post');
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setTitle(post.title);
        setContent(post.content);
        setStatus(post.status);
    };

    const handleDelete = async (postId) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/content/posts/${postId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage('Post deleted successfully!');
            fetchPosts();
        } catch (err) {
            console.error('Error deleting post:', err);
            setError(err.response?.data?.message || 'Failed to delete post');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <RoleGuard allowedRoles={['editor']}>
            <Head>
                <title>Content Management - Editor</title>
            </Head>
            
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Content Management</h1>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}

                {/* Post Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Content</label>
                            <textarea
                                className="w-full p-2 border rounded h-32"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Status</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {editingPost ? 'Update Post' : 'Create Post'}
                            </button>
                            {editingPost && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Posts List */}
                <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <tr key={post._id} className="border-t">
                                        <td className="px-4 py-2">{post.title}</td>
                                        <td className="px-4 py-2 capitalize">{post.status}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="text-blue-600 hover:text-blue-800 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                                        No posts found
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

export default ContentManagementPage;