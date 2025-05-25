const joi = require("joi");

const paiementSchema = joi
  .object({
    Id_paiement: joi.number().optional(),
    Numero_paiement: joi.string().max(50).required(),
    cin_client: joi.string().length(8).required(),
    Numero_contrat: joi.string().max(255).required(), // Expects a single string now
    date_paiement: joi.date().iso().required(),
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
    montant_paiement: joi.number().precision(2).allow(null).optional()
  })
  .unknown(true);

const findIdPaiementSchema = joi.object({
  Id_paiement: joi.number().integer().min(1).required(),
});

const createPaiementSchema = paiementSchema.fork(
  ["Id_paiement", "Numero_paiement"],
  (schema) => schema.optional()
);

exports.paiementSchema = paiementSchema;
exports.findIdPaiementSchema = findIdPaiementSchema;
exports.createPaiementSchema = createPaiementSchema;