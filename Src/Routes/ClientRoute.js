const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const {
  findIdClientSchema,
  createClientSchema,
  forgotPasswordSchema,
  updateClientFidelStatusSchema, // Import updateClientFidelStatusSchema here!
} = require("../Validations/ClientValidation");
const router = express.Router();
const clientController = require("../Controllers/clientController"); // Importez le contrôleur ici
const {
  getClient,
  addClient,
  getClientById,
  updateClient,
  deleteClient,
  getClientByCIN,
  loginClient,
  updateClientLoginInfo,
  checkClientAssociations,
  updateClientFidelStatus,
} = clientController; // Utilisez le contrôleur importé pour accéder aux fonctions

// Routes
router.get("/", getClient);
router.get("/cin_client", getClientByCIN);
router.post("/", validateBody(createClientSchema), addClient);
router.get("/:id_client", validateParams(findIdClientSchema), getClientById);
router.put(
  "/:id_client",
  validateParams(findIdClientSchema),
  validateBody(createClientSchema),
  updateClient
);
router.delete("/:id_client", validateParams(findIdClientSchema), deleteClient);
router.put(
  "/:id_client/login",
  validateParams(findIdClientSchema),
  updateClientLoginInfo
);
router.post("/login", loginClient);
router.put(
  "/:id_client/fidel",
  validateParams(findIdClientSchema),
  validateBody(updateClientFidelStatusSchema),
  updateClientFidelStatus
);
router.get(
  "/:id_client/associations",
  validateParams(findIdClientSchema),
  checkClientAssociations
);
router.post(
  "/send-password-email",
  /* Middleware de validation si nécessaire */ clientController.sendPasswordEmail
);

module.exports = router;
