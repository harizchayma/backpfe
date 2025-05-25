const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdAvanceSchema, createAvanceSchema, avanceSchema } = require("../Validations/AvanceValidation"); // Import avanceSchema
const router = express.Router();
const {
    getAvance,
    getLastNumeroAvance,
    getAvancesByContratId,
    getAvancesByCinClient,
    addAvance,
    getAvanceById,
    updateAvance,
    deleteAvance
} = require("../Controllers/AvanceController");

router.get("/", getAvance);
router.get('/last', getLastNumeroAvance);
router.get("/contrat/:contrat_id", getAvancesByContratId);
router.post("/", validateBody(createAvanceSchema), addAvance);
router.get("/:id_avance", validateParams(findIdAvanceSchema), getAvanceById);
router.put("/:id_avance", validateParams(findIdAvanceSchema), validateBody(avanceSchema), updateAvance);
router.delete("/:id_avance", validateParams(findIdAvanceSchema), deleteAvance);
router.get("/client/:cin_client", getAvancesByCinClient);
module.exports = router;