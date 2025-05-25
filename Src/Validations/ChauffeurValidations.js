const joi = require("joi");

const createChauffeurSchema = joi.object({
    id_chauffeur: joi.number().integer().min(1).optional(),
    nom_fr: joi.string().min(1).max(100).required(),
    nom_ar: joi.string().min(1).max(100).required(),
    prenom_fr: joi.string().min(1).max(100).required(),
    prenom_ar: joi.string().min(1).max(100).required(),
    cin_chauffeur: joi.string().length(8).required(),
    date_cin_chauffeur: joi.date().iso().required(),
    date_naiss: joi.date().iso().required(),
    adresse_fr: joi.string().min(1).max(255).required(),
    adresse_ar: joi.string().min(1).max(255).required(),
    num_tel: joi.string().min(1).max(20).required(),
    numero_permis: joi.string().min(1).max(50).required(),
    date_permis: joi.date().iso().required(),
    profession_fr: joi.string().max(100).optional(),
    profession_ar: joi.string().max(100).optional(),
    nationalite_origine: joi.string().max(100).required(), // Make it required
});

const findIdChauffeurSchema = joi.object({
    id_chauffeur: joi.number().integer().min(1).required()
});

module.exports = {
    findIdChauffeurSchema,
    createChauffeurSchema
};