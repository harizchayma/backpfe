const {
    getPaiementServices,
    addPaiementServices,
    getPaiementByIdServices,
    updatePaiementService,
    deletePaiementService,
    getPaiementsByContratIdServices, // Ajouté
    getPaiementsByCinClientServices // Ensure this is correctly imported
} = require("../Services/PaiementServices");
const Paiement = require("../Model/PaiementModel"); // Assurez-vous que le chemin est correct
const { createPaiementSchema } = require("../Validations/PaiementValidation"); // Import the schema

const handleResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        message: message,
        data: data
    });
};

const getPaiement = async (req, res) => {
    try {
        const data = await getPaiementServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Paiements retrieved successfully" : "No payments found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving payments", { error: error.message });
    }
};
const getPaiementsByCinClient = async (req, res) => {
    try {
        const { cin_client } = req.params;
        const data = await getPaiementsByCinClientServices(cin_client);
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Payments retrieved successfully for this client" : "No payments found for this client", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving payments by CIN", { error: error.message });
    }
};
const getLastNumeroPaiement = async (req, res) => {
    try {
        console.log("Tentative de récupération du dernier numéro de paiement...");
        const lastPaiement = await Paiement.findOne({
            order: [['Id_paiement', 'DESC']],
            attributes: ['Numero_paiement'] // Utiliser 'Numero_paiement' (N majuscule)
        });
        console.log("Dernier paiement trouvé:", lastPaiement);
        if (!lastPaiement) {
            return res.status(404).json({ message: "Aucun paiement trouvé." });
        }
        res.json(lastPaiement.Numero_paiement); // Utiliser 'Numero_paiement' (N majuscule)
    } catch (error) {
        console.error("Erreur lors de la récupération du dernier numéro de paiement:", error);
        res.status(500).json({ error: "Erreur de base de données" });
    }
};
const addPaiement = async (req, res) => {
    try {
        console.log("Incoming payment data:", req.body); // This log will show you the received payload.
        const { error } = createPaiementSchema.validate(req.body); // Validation now works
        if (error) {
            console.error("Validation error:", error.details); // Log the validation errors
            return res.status(400).json({ error: error.details });
        }
        const data = await addPaiementServices(req.body);
        return handleResponse(res, 201, "Paiement added successfully", data);
    } catch (error) {
        console.error("Error while adding paiement:", error);
        return handleResponse(res, 500, "An error occurred while adding payment", { error: error.message });
    }
};

const getPaiementById = async (req, res) => {
    try {
        const { Id_paiement } = req.params;
        const data = await getPaiementByIdServices(Id_paiement);
        if (!data) {
            return handleResponse(res, 404, "Payment not found. Please check the ID.");
        }
        return handleResponse(res, 200, "Payment retrieved successfully", data);
    } catch (error) {
        return handleResponse(res, 500, "Error fetching payment by ID", { error: error.message });
    }
};

const updatePaiement = async (req, res) => {
    try {
      const { Id_paiement } = req.params;
      console.log("Backend received update request for ID:", Id_paiement, "with body:", req.body);
      const { error } = createPaiementSchema.validate(req.body);
      if (error) {
        console.error("Backend Validation Error (Update):", error.details);
        return res.status(400).json({ error: error.details });
      }
      const updatedPaiement = await updatePaiementService(Id_paiement, req.body);
      return handleResponse(res, updatedPaiement ? 200 : 404, updatedPaiement ? "Payment updated successfully" : "Payment not found", updatedPaiement);
    } catch (error) {
      return handleResponse(res, 500, "An error occurred while updating payment", { error: error.message });
    }
  };

const deletePaiement = async (req, res) => {
    try {
        const { Id_paiement } = req.params;
        const paiement = await getPaiementByIdServices(Id_paiement);
        if (!paiement) {
            return handleResponse(res, 404, "Payment not found");
        }

        const result = await deletePaiementService(Id_paiement);
        if (result === 0) {
            return handleResponse(res, 404, "Payment not found or already deleted");
        }

        return handleResponse(res, 200, "Payment deleted successfully", paiement);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while deleting payment", { error: error.message });
    }
};

const getPaiementsByContratId = async (req, res) => {
    try {
        const { contrat_id } = req.params; // Extraire contrat_id des paramètres de la requête
        const data = await getPaiementsByContratIdServices(contrat_id);
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Payments retrieved successfully" : "No payments found for this contract", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving payments", { error: error.message });
    }
};

module.exports = {
    getPaiement,
    getLastNumeroPaiement,
    getPaiementsByCinClient,
    addPaiement,
    getPaiementById,
    updatePaiement,
    deletePaiement,
    getPaiementsByContratId // Ajouté
};