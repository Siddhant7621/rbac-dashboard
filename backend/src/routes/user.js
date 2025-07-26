// backend/src/routes/user.js
import express from 'express';
import { getUsers, updateUserRole, deleteUser } from '../controllers/userController.js'; // Note the .js extension
import auth from '../middleware/auth.js'; // Note the .js extension
import authorize from '../middleware/authorize.js'; // Note the .js extension

const router = express.Router();

// All user management routes require 'admin' role
router.route('/')
    .get(auth, authorize('admin'), getUsers);

router.route('/:id/role')
    .put(auth, authorize('admin'), updateUserRole);

router.route('/:id')
    .delete(auth, authorize('admin'), deleteUser);

export default router;
