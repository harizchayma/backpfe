const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdChauffeurSchema, createChauffeurSchema } = require("../Validations/ChauffeurValidations");
const router = express.Router();
const {
    getChauffeur,
    addChauffeur,
    getChauffeurById,
    updateChauffeur,
    deleteChauffeur
} = require("../Controllers/ChauffeurController");

// Routes
router.get("/", getChauffeur);
router.post("/", validateBody(createChauffeurSchema), addChauffeur);
router.get("/:id_chauffeur", validateParams(findIdChauffeurSchema), getChauffeurById);
router.put("/:id_chauffeur", validateParams(findIdChauffeurSchema), validateBody(createChauffeurSchema), updateChauffeur);
router.delete("/:id_chauffeur", validateParams(findIdChauffeurSchema), deleteChauffeur);

module.exports = router;