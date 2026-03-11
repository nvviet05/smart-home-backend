const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema(
    {
        temperature: {
            type: Number,
        },
        humidity: {
            type: Number,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SensorData', sensorDataSchema);
