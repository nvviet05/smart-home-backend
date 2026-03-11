const Device = require('../models/Device.model');

const getAll = async (userId) => {
    return Device.find({ user: userId }).sort({ createdAt: -1 });
};

// Frontend sends a control command (e.g. turn fan on)
const control = async (deviceId, action, userId) => {
    const device = await Device.findOne({ _id: deviceId, user: userId });
    if (!device) {
        const error = new Error('Device not found');
        error.statusCode = 404;
        throw error;
    }
    device.status = action; // 'on' or 'off'
    await device.save();
    return device;
};

// ESP32 reports the actual device status
const reportStatus = async (deviceId, status, userId) => {
    const device = await Device.findOne({ _id: deviceId, user: userId });
    if (!device) {
        const error = new Error('Device not found');
        error.statusCode = 404;
        throw error;
    }
    device.status = status;
    await device.save();
    return device;
};

// ESP32 polls for pending commands
const getCommand = async (userId) => {
    const devices = await Device.find({ user: userId }).select('type status');
    return devices;
};

module.exports = { getAll, control, reportStatus, getCommand };
