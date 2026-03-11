const SensorData = require('../models/SensorData.model');

const getLatest = async (userId) => {
    return SensorData.findOne({ user: userId }).sort({ createdAt: -1 });
};

const getHistory = async (userId, { from, to, limit = 50 }) => {
    const query = { user: userId };

    if (from || to) {
        query.createdAt = {};
        if (from) query.createdAt.$gte = new Date(from);
        if (to) query.createdAt.$lte = new Date(to);
    }

    return SensorData.find(query).sort({ createdAt: -1 }).limit(Number(limit));
};

const create = async (data, userId) => {
    return SensorData.create({ ...data, user: userId });
};

module.exports = { getLatest, getHistory, create };
