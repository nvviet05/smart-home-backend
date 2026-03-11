const deviceService = require('../services/device.service');

const getAll = async (req, res, next) => {
    try {
        const devices = await deviceService.getAll(req.user._id);
        res.json(devices);
    } catch (err) {
        next(err);
    }
};

const control = async (req, res, next) => {
    try {
        const { deviceId, action } = req.body;
        const device = await deviceService.control(deviceId, action, req.user._id);
        res.json(device);
    } catch (err) {
        next(err);
    }
};

const reportStatus = async (req, res, next) => {
    try {
        const { deviceId, status } = req.body;
        const device = await deviceService.reportStatus(deviceId, status, req.user._id);
        res.json(device);
    } catch (err) {
        next(err);
    }
};

const getCommand = async (req, res, next) => {
    try {
        const commands = await deviceService.getCommand(req.user._id);
        res.json(commands);
    } catch (err) {
        next(err);
    }
};

module.exports = { getAll, control, reportStatus, getCommand };
