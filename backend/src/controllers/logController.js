// backend/src/controllers/logController.js
import Log from '../models/Log.js'; // Note the .js extension

// @desc    Get all system logs
// @route   GET /api/logs
// @access  Private/Admin
export const getSystemLogs = async (req, res) => {
    try {
        const logs = await Log.find({}).sort({ timestamp: -1 }); // Sort by newest first
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching logs' });
    }
};