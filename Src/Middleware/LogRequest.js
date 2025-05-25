const logRequest = (req, res, next) => {
    console.log(`${new Date().toString()} - Method: ${req.method} - URL: ${req.originalUrl} - Body: ${JSON.stringify(req.body)}`);
    next();
};

module.exports = { logRequest };
