// backend/src/routes/auth.js
import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js'; // Note the .js extension
import auth from '../middleware/auth.js'; // Note the .js extension

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getProfile); // Protected route

export default router;
