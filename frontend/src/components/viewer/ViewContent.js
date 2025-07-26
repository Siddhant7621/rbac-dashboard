import { useState, useEffect } from 'react';
import api from '../../api';

const ViewContent = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">View Content</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewContent;