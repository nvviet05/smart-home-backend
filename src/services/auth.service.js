const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

const register = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error('Email đã được sử dụng');
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    };
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        const error = new Error('Email hoặc mật khẩu không đúng');
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user._id);

    return {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    };
};

const getMe = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error('Người dùng không tồn tại');
        error.statusCode = 404;
        throw error;
    }
    return { id: user._id, name: user.name, email: user.email, role: user.role };
};

module.exports = { register, login, getMe };
