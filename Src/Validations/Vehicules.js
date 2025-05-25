const joi = require("joi");

const createVehiculesSchema = joi.object({
    id_vehicule: joi.number().integer().min(1).optional(),
    n_serie_du_type: joi.string().min(1).max(30).required(),
    marque: joi.string().min(1).max(50).required(),
    modele: joi.string().min(1).max(50).required(),
    type_commercial: joi.string().min(1).max(50).required(),
    carrosserie: joi.number().integer().min(1).required(),
    energie: joi.string().valid("Essence", "Diesel", "Gaz", "Électrique", "Hybride").required(),
    puissance_fiscale: joi.number().min(0).required(),
    nbr_places: joi.number().integer().min(1).required(),
    cylindree: joi.number().min(0).required(),
    num_certificat: joi.string().min(1).max(20).required(),
    lieu_certificat: joi.string().min(1).max(50).required(),
    date_certificat: joi.date().iso().required(),
    prix_jour: joi.number().positive().required(),
    id_categorie: joi.number().integer().min(1).required(),
    image: joi.string().uri().optional(),
}).unknown(true);

const findIdVehiculesSchema = joi.object({
    id_vehicule: joi.string().min(1).optional()
});
const findNumImmatriculationSchema = joi.object({
    num_immatriculation: joi.string().min(1).required()
});
module.exports = {
    findIdVehiculesSchema,
    createVehiculesSchema,
    findNumImmatriculationSchema
};