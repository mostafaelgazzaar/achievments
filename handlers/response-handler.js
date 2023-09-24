const responseHandler = (req, res, next) => {
    // Success response handler
    res.success = (data, statusCode = 200) => {
        res.status(statusCode).json({ success: true, data });
    };

    // Error response handler
    res.error = (message, statusCode = 500) => {
        res.status(statusCode).json({ success: false, error: message });
    };

    next();
};

module.exports = responseHandler;
