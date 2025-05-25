const {
    getAvanceServices,
    addAvanceServices,
    getAvanceByIdServices,
    updateAvanceService,
    deleteAvanceService,
    getAvancesByContratIdServices ,
    getAvancesByCinClientServices
} = require("../Services/AvanceServices");
const Avance = require("../Model/AvanceModel"); // Assurez-vous que le chemin est correct
const handleResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        message: message,
        data: data
    });
};

const getAvance = async (req, res) => {
    try {
        const data = await getAvanceServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Avance retrieved successfully" : "No Avance found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving Avance", { error: error.message });
    }
};

const getLastNumeroAvance = async (req, res) => {
    try {
        console.log("Tentative de récupération du dernier numéro d'avance...");
        const lastAvance = await Avance.findOne({
            order: [['id_avance', 'DESC']],
            attributes: ['Numero_avance']
        });
        console.log("Dernière avance trouvée:", lastAvance);
        if (!lastAvance) {
            return res.status(404).json({ message: "Aucune avance trouvée." });
        }
        res.json(lastAvance.Numero_avance);
    } catch (error) {
        console.error("Erreur lors de la récupération du dernier numéro d'avance:", error);
        res.status(500).json({ error: "Erreur de base de données" });
    }
};
const addAvance = async (req, res) => {
    try {
        console.log("Requete body:", req.body);
        const data = await addAvanceServices(req.body);
        return handleResponse(res, 201, "Avance added successfully", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while adding Avance", { error: error.message });
    }
};

const getAvanceById = async (req, res) => {
    try {
        const { id_avance } = req.params;
        const data = await getAvanceByIdServices(id_avance);
        if (!data) {
            return handleResponse(res, 404, "Avance not found. Please check the ID.");
        }
        return handleResponse(res, 200, "Avance retrieved successfully", data);
    } catch (error) {
        return handleResponse(res, 500, "Error fetching Avance by ID", { error: error.message });
    }
};

const updateAvance = async (req, res) => {
    try {
        const { id_avance } = req.params;
const updatedAvance = await updateAvanceService(id_avance, req.body);
        return handleResponse(res, updatedAvance ? 200 : 404, updatedAvance ? "Avance updated successfully" : "Avance not found", updatedAvance);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while updating Avance", { error: error.message });
    }
};

const deleteAvance = async (req, res) => {
    try {
        const { id_avance } = req.params;
        const avance = await getAvanceByIdServices(id_avance);
        if (!avance) {
            return handleResponse(res, 404, "Avance not found");
        }

        const result = await deleteAvanceService(id_avance);
        if (result === 0) {
            return handleResponse(res, 404, "Avance not found or already deleted");
        }

        return handleResponse(res, 200, "Avance deleted successfully", avance);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while deleting Avance", { error: error.message });
    }
};
const getAvancesByContratId = async (req, res) => {
    try {
        const { contrat_id } = req.params; // Extract contrat_id from request params
        const data = await getAvancesByContratIdServices(contrat_id);
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Avances retrieved successfully" : "No advances found for this contract", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving advances", { error: error.message });
    }
};
const getAvancesByCinClient = async (req, res) => {
    try {
        const { cin_client } = req.params; // Extract cin_client from request params
        const data = await getAvancesByCinClientServices(cin_client);
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Avances retrieved successfully" : "No advances found for this client", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving advances by CIN", { error: error.message });
    }
};
module.exports = {
    getAvance,
    getLastNumeroAvance,
    addAvance,
    getAvanceById,
    updateAvance,
    deleteAvance,
    getAvancesByContratId ,
    getAvancesByCinClient
};