const express = require("express");
const { validateParams } = require("../Middleware/Validation");
const { findIdPaiementSchema } = require("../Validations/PaiementValidation");
const router = express.Router();
const {
    getPaiement,
    getLastNumeroPaiement,
    addPaiement,
    getPaiementById,
    updatePaiement,
    deletePaiement,
    getPaiementsByContratId,
    getPaiementsByCinClient // Import the new controller function
} = require("../Controllers/PaiementController");

router.get("/", getPaiement);
router.get('/last', getLastNumeroPaiement);
router.post("/", addPaiement); // Assuming you have middleware for body validation
router.get("/:Id_paiement", validateParams(findIdPaiementSchema), getPaiementById);
router.put("/:Id_paiement", validateParams(findIdPaiementSchema), updatePaiement); // Assuming you have middleware for body validation
router.delete("/:Id_paiement", validateParams(findIdPaiementSchema), deletePaiement);
router.get("/contrat/:contrat_id", validateParams(findIdPaiementSchema), getPaiementsByContratId);
router.get("/client/:cin_client", getPaiementsByCinClient); // New route to get payments by cin_client

module.exports = router;