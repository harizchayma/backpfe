// Src/Middleware/ErrorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        error: err.message,
    });
};

module.exports = errorHandler;