const joi = require("joi");

const avanceSchema = joi.object({
    id_avance: joi.number().integer().optional(), // Still optional
    cin_client: joi.string().length(8).required(),
    date: joi.date().iso().required(),
    Numero_contrat: joi.string().max(255).allow(null),
    Numero_avance: joi.string().allow(null),
    montant_cheque1: joi.number().precision(2).allow(null).optional(),
    banque_cheque1: joi.string().max(200).allow(null).optional(),
    echeance_cheque1: joi.string().max(100).allow(null).optional(),
    date_cheque1: joi.date().iso().allow(null).optional(),
    montant_cheque2: joi.number().precision(2).allow(null).optional(),
    banque_cheque2: joi.string().max(200).allow(null).optional(),
    echeance_cheque2: joi.string().max(100).allow(null).optional(),
    date_cheque2: joi.date().iso().allow(null).optional(),
    montant_espace: joi.number().precision(2).allow(null).optional(),
    montant_virement: joi.number().precision(2).allow(null).optional(),
    banque_virement: joi.string().max(255).allow(null).optional(),
    montant_avance: joi.number().precision(2).allow(null).optional() // Champ optionnel à ajouter
}).unknown(true);

// Find schema for 'avance'
const findIdAvanceSchema = joi.object({
    id_avance: joi.number().integer().min(1).required(),
});

// Create schema for 'avance'
const createAvanceSchema = avanceSchema.fork(
    ["id_avance", "Numero_avance"],
    (schema) => schema.optional()
);

exports.avanceSchema = avanceSchema;
exports.findIdAvanceSchema = findIdAvanceSchema;
exports.createAvanceSchema = createAvanceSchema;