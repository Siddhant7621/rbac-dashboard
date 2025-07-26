// backend/src/models/Log.js
import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Can be null for system-generated logs
    },
    username: {
        type: String,
        required: false // Denormalized for easier querying
    },
    action: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Log', LogSchema);