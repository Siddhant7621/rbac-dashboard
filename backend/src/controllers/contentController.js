// backend/src/controllers/contentController.js
import Post from '../models/Post.js'; // Note the .js extension
import Log from '../models/Log.js'; // Note the .js extension

// @desc    Get all posts (Editor/Viewer)
// @route   GET /api/content/posts
// @access  Private/Editor, Viewer
export const getPosts = async (req, res) => {
    try {
        // Viewers only see published posts
        const query = req.user.role === 'viewer' ? { status: 'published' } : {};
        const posts = await Post.find(query).populate('author', 'username'); // Populate author's username
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching posts' });
    }
};

// @desc    Create a new post (Editor)
// @route   POST /api/content/posts
// @access  Private/Editor
export const createPost = async (req, res) => {
    const { title, content, status } = req.body;

    try {
        const post = await Post.create({
            title,
            content,
            author: req.user._id, // Author is the logged-in user
            status: status || 'draft'
        });

        await Log.create({ userId: req.user._id, username: req.user.username, action: 'Create Post', details: `Post "${post.title}" created by ${req.user.username}.` });
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating post' });
    }
};

// @desc    Update a post (Editor)
// @route   PUT /api/content/posts/:id
// @access  Private/Editor
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, status } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Optional: Only allow author or admin to update their own posts
        // if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Forbidden: You can only update your own posts' });
        // }

        post.title = title || post.title;
        post.content = content || post.content;
        post.status = status || post.status;
        post.updatedAt = Date.now();

        await post.save();

        await Log.create({ userId: req.user._id, username: req.user.username, action: 'Update Post', details: `Post "${post.title}" (ID: ${post._id}) updated by ${req.user.username}.` });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating post' });
    }
};

// @desc    Delete a post (Editor)
// @route   DELETE /api/content/posts/:id
// @access  Private/Editor
export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Optional: Only allow author or admin to delete their own posts
        // if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Forbidden: You can only delete your own posts' });
        // }

        await post.deleteOne();

        await Log.create({ userId: req.user._id, username: req.user.username, action: 'Delete Post', details: `Post "${post.title}" (ID: ${post._id}) deleted by ${req.user.username}.` });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting post' });
    }
};