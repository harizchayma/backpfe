// Validations/ContratChauffeurValidation.js
const Joi = require("joi");

const findIdContratChauffeurSchema = Joi.object({
  id_contrat_chauffeur: Joi.number().integer().min(1).required(),
});

const findNumeroContratChauffeurSchema = Joi.object({
  numero_contrat: Joi.string().min(1).max(50).required(),
});

const createContratChauffeurSchema = Joi.object({
  Numero_contrat: Joi.string().min(1).max(50).required(),
  id_chauffeur: Joi.alternatives().try(
    Joi.number().integer().min(1),
    Joi.allow(null)
  ),
  id_client: Joi.alternatives().try(
    Joi.number().integer().min(1),
    Joi.allow(null)
  ),
});

const updateContratChauffeurSchema = Joi.object({
  Numero_contrat: Joi.string().min(1).max(50).optional(),
  id_chauffeur: Joi.number().integer().min(1).optional(),
  id_client: Joi.number().integer().min(1).optional(),
});

module.exports = {
  findIdContratChauffeurSchema,
  findNumeroContratChauffeurSchema,
  createContratChauffeurSchema,
  updateContratChauffeurSchema,
};