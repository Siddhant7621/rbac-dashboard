import { useState, useEffect } from 'react';
import api from '../../api';

const ContentManagement = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/content');
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/content', { title, content });
      setPosts([...posts, data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Posts</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;