const joi = require("joi");

const createUserSchema = joi.object({
  login: joi.string().required().max(100),
  password: joi.string().required(),
  role: joi.string().valid("Admin", "user").required(), // Ensure casing is consistent with what you're sending
  image: joi.string().uri().optional(),
  cin_utilisateur: joi.string().max(8).optional(), // Add constraints based on your model
  tel: joi.string().max(8).optional(),
  mail: joi.string().email().optional(),
  nom: joi.string().optional(),
  prenom: joi.string().optional(),
  etat: joi.string().valid("0", "1").optional(), // If STRING
}).unknown(true);

const loginSchema = joi.object({
    login: joi.string().required(),
    password: joi.string().required(),
}).unknown(true);

module.exports = { createUserSchema, loginSchema };