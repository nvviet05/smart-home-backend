const sensorService = require('../services/sensor.service');

const getLatest = async (req, res, next) => {
    try {
        const data = await sensorService.getLatest(req.user._id);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

const getHistory = async (req, res, next) => {
    try {
        const { from, to, limit } = req.query;
        const data = await sensorService.getHistory(req.user._id, { from, to, limit });
        res.json(data);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const data = await sensorService.create(req.body, req.user._id);
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
};

module.exports = { getLatest, getHistory, create };
