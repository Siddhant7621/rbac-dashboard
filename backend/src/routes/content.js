// backend/src/routes/content.js
import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/contentController.js'; // Note the .js extension
import auth from '../middleware/auth.js'; // Note the .js extension
import authorize from '../middleware/authorize.js'; // Note the .js extension

const router = express.Router();

// Viewer and Editor can get posts
router.route('/posts')
    .get(auth, authorize('editor', 'viewer'), getPosts)
    .post(auth, authorize('editor'), createPost); // Only Editor can create

router.route('/posts/:id')
    .put(auth, authorize('editor'), updatePost) // Only Editor can update
    .delete(auth, authorize('editor'), deletePost); // Only Editor can delete

export default router;