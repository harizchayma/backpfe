const joi = require("joi");

const createClientSchema = joi.object({
    id_client: joi.number().optional(),
    nom_fr: joi.string().required(),
    nom_ar: joi.string().required(),
    prenom_fr: joi.string().required(),
    prenom_ar: joi.string().required(),
    cin_client: joi.string().required(),
    date_cin: joi.date().iso().required(),
    date_naiss: joi.date().iso().required(),
    adresse_fr: joi.string().required(),
    adresse_ar: joi.string().required(),
    num_tel: joi.string().required(),
    Numero_Permis: joi.string().required(),
    date_permis: joi.date().iso().required(),
    profession_fr: joi.string().optional(),
    profession_ar: joi.string().optional(),
    nationalite_origine: joi.string().required(),
    email: joi.string().email().optional(),
    password: joi.string().min(6).optional(),
    is_fidel: joi.boolean().optional() // Add is_fidel to the schema
}).unknown(true);

const findIdClientSchema = joi.object({
    id_client: joi.string().required()
});

const forgotPasswordSchema = joi.object({
    email: joi.string().email().required()
});

const updateClientFidelStatusSchema = joi.object({
    is_fidel: joi.number().valid(0, 1).required()
});

exports.findIdClientSchema = findIdClientSchema;
exports.createClientSchema = createClientSchema;
exports.forgotPasswordSchema = forgotPasswordSchema;
exports.updateClientFidelStatusSchema = updateClientFidelStatusSchema; // Export the new schema