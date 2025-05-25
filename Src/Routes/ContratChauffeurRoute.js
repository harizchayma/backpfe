// Routes/ContratChauffeurRouter.js
const express = require('express');
const {
  validateParams,
  validateBody,
} = require('../Middleware/Validation');

const {
  findIdContratChauffeurSchema,
  findNumeroContratChauffeurSchema,
  createContratChauffeurSchema,
  updateContratChauffeurSchema,
} = require('../Validations/ContratChauffeurValidation');

const {
  getContratChauffeur,
  getContratChauffeurById,
  addContratChauffeur,
  updateContratChauffeur,
  deleteContratChauffeur,
  getContratChauffeurByNumeroContrat,
} = require('../Controllers/ContratChauffeurController');

const router = express.Router();

router.get('/', getContratChauffeur);
router.post('/', validateBody(createContratChauffeurSchema), addContratChauffeur);
router.get('/:id_contrat_chauffeur', validateParams(findIdContratChauffeurSchema), getContratChauffeurById);
router.get('/numero/:numero_contrat', validateParams(findNumeroContratChauffeurSchema), getContratChauffeurByNumeroContrat);
router.put('/:id_contrat_chauffeur', validateParams(findIdContratChauffeurSchema), validateBody(updateContratChauffeurSchema), updateContratChauffeur);
router.delete('/:id_contrat_chauffeur', validateParams(findIdContratChauffeurSchema), deleteContratChauffeur);

module.exports = router;