// backend/src/controllers/userController.js
import User from '../models/User.js'; // Note the .js extension
import Log from '../models/Log.js'; // Note the .js extension

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude passwords
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching users' });
    }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'editor', 'viewer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent admin from changing their own role to something else (optional, but good practice)
        if (req.user._id.toString() === id && role !== 'admin') {
            return res.status(403).json({ message: 'Admins cannot demote themselves' });
        }

        const oldRole = user.role;
        user.role = role;
        await user.save();

        await Log.create({ userId: req.user._id, username: req.user.username, action: 'Update User Role', details: `User ${user.username} (ID: ${user._id}) role changed from ${oldRole} to ${role} by ${req.user.username}.` });
        res.json({ message: 'User role updated successfully', user: { _id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating user role' });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent admin from deleting themselves
        if (req.user._id.toString() === id) {
            return res.status(403).json({ message: 'Admins cannot delete their own account' });
        }

        await user.deleteOne(); // Use deleteOne() for Mongoose 6+

        await Log.create({ userId: req.user._id, username: req.user.username, action: 'Delete User', details: `User ${user.username} (ID: ${user._id}) deleted by ${req.user.username}.` });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting user' });
    }
};