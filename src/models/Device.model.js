const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Device name is required'],
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['light', 'fan'],
        },
        status: {
            type: String,
            enum: ['on', 'off'],
            default: 'off',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);
