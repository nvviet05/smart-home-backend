const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên thiết bị không được để trống'],
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['light', 'fan', 'ac', 'door', 'other'],
            default: 'other',
        },
        status: {
            type: String,
            enum: ['on', 'off'],
            default: 'off',
        },
        room: {
            type: String,
            trim: true,
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
