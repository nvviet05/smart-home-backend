const Device = require('../models/Device.model');

const getAll = async (userId) => {
    return Device.find({ user: userId }).sort({ createdAt: -1 });
};

const getById = async (id, userId) => {
    const device = await Device.findOne({ _id: id, user: userId });
    if (!device) {
        const error = new Error('Không tìm thấy thiết bị');
        error.statusCode = 404;
        throw error;
    }
    return device;
};

const create = async (data, userId) => {
    return Device.create({ ...data, user: userId });
};

const update = async (id, data, userId) => {
    const device = await Device.findOneAndUpdate(
        { _id: id, user: userId },
        data,
        { new: true, runValidators: true }
    );
    if (!device) {
        const error = new Error('Không tìm thấy thiết bị');
        error.statusCode = 404;
        throw error;
    }
    return device;
};

const toggle = async (id, userId) => {
    const device = await Device.findOne({ _id: id, user: userId });
    if (!device) {
        const error = new Error('Không tìm thấy thiết bị');
        error.statusCode = 404;
        throw error;
    }
    device.status = device.status === 'on' ? 'off' : 'on';
    await device.save();
    return device;
};

const remove = async (id, userId) => {
    const device = await Device.findOneAndDelete({ _id: id, user: userId });
    if (!device) {
        const error = new Error('Không tìm thấy thiết bị');
        error.statusCode = 404;
        throw error;
    }
    return device;
};

module.exports = { getAll, getById, create, update, toggle, remove };
