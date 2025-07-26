// backend/src/routes/log.js
import express from 'express';
import { getSystemLogs } from '../controllers/logController.js'; // Note the .js extension
import auth from '../middleware/auth.js'; // Note the .js extension
import authorize from '../middleware/authorize.js'; // Note the .js extension

const router = express.Router();

router.route('/')
    .get(auth, authorize('admin'), getSystemLogs); // Only Admin can view logs

export default router;