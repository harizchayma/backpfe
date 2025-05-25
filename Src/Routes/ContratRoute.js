const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdContratSchema, createContratSchema, findNumeroContratSchema, updateSoldeContratSchema } = require("../Validations/ContratValidation");
const router = express.Router();
const {
    getContrat,
    getLastNumeroContrat,
    addContrat,
    getContratById,
    updateContrat,
    deleteContrat,
    getContratByCinClient, // Add this function
    checkContratAssociations, // Add this function
    updateContratSolde // Add this function
} = require("../Controllers/ContratController");

// Define routes
router.get("/", getContrat);
router.post("/", validateBody(createContratSchema), addContrat);
router.get("/last", getLastNumeroContrat);
router.get("/:ID_contrat", validateParams(findIdContratSchema), getContratById);
router.put("/:ID_contrat", validateParams(findIdContratSchema), validateBody(createContratSchema), updateContrat);
router.delete("/:ID_contrat", validateParams(findIdContratSchema), deleteContrat);
router.get("/cin/:cin_client", getContratByCinClient); // New route to get contracts by cin_client
router.get("/associations/:Numero_contrat", validateParams(findNumeroContratSchema), checkContratAssociations);
router.patch("/solde/:ID_contrat", validateParams(findIdContratSchema), validateBody(updateSoldeContratSchema), updateContratSolde); // Nouvelle route pour mettre à jour le solde

module.exports = router;