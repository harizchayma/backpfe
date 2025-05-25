const joi = require("joi");

const createReservationSchema = joi.object({
    Date_debut: joi.date().iso().required(),
    Heure_debut: joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).required(),
    Date_retour: joi.date().iso().greater(joi.ref('Date_debut')).required(),
    Heure_retour: joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).required(),
    Duree_location: joi.number().integer().positive().required(),
    num_immatriculation: joi.string().max(20).required(),
    cin_client: joi.string().length(8).required(),
    Prix_total: joi.number().precision(2).positive().required(),
    action: joi.string().valid("accepte", "rejecte", "en attent").optional(),
    login_id: joi.number().integer().allow(null).optional(),
}).unknown(true);

const findIdReservationSchema = joi.object({
    id_reservation: joi.number().integer().required()
});

const updateActionSchema = joi.object({
    action: joi.string().valid('accepte', 'rejecte').required(),
    login_id: joi.number().integer().optional() // login_id is optional for action updates
});

module.exports = {
    createReservationSchema,
    findIdReservationSchema,
    updateActionSchema
};