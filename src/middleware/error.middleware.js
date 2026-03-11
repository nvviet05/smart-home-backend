// Centralized error handler
const errorHandler = (err, _req, res, _next) => {
    console.error('❌ Error:', err.message);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ message: messages.join(', ') });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(409).json({ message: 'Duplicate entry' });
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Internal server error' });
};

module.exports = { errorHandler };
