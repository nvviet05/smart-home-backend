const deviceService = require('../services/device.service');

const getAll = async (req, res, next) => {
    try {
        const devices = await deviceService.getAll(req.user._id);
        res.json(devices);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const device = await deviceService.getById(req.params.id, req.user._id);
        res.json(device);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const device = await deviceService.create(req.body, req.user._id);
        res.status(201).json(device);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const device = await deviceService.update(req.params.id, req.body, req.user._id);
        res.json(device);
    } catch (err) {
        next(err);
    }
};

const toggle = async (req, res, next) => {
    try {
        const device = await deviceService.toggle(req.params.id, req.user._id);
        res.json(device);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        await deviceService.remove(req.params.id, req.user._id);
        res.json({ message: 'Đã xoá thiết bị' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAll, getById, create, update, toggle, remove };
