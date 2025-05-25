const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message);
            return res.status(400).json({
                statusCode: 400,
                error: errorMessage,
                details: error.details // Incluez les détails de l'erreur
            });
        }
        next();
    };
};

const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message);
            return res.status(400).json({
                statusCode: 400,
                error: errorMessage,
            });
        }
        next();
    };
};

module.exports = {
    validateBody,
    validateParams
};