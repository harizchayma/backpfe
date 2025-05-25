const { createContratSchema, updateSoldeContratSchema } = require('../Validations/ContratValidation');

const {
    getContratServices,
    getLastContratNumberService,
    addContratServices,
    getContratByIdServices,
    updateContratService,
    deleteContratService, // Using the modified service
    getContratByCinClientServices,
    checkContratAssociationsService,
    updateContratSoldeService
} = require("../Services/ContratServices");

const handleResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        message: message,
        data: data
    });
};

const getContrat = async (req, res) => {
    try {
        const contrats = await getContratServices();
        const contratsFormatte = contrats.map(contrat => ({
            ...contrat.get({ plain: true }),
            Date_debut: contrat.Date_debut ? new Date(contrat.Date_debut).toISOString() : null,
            Date_retour: contrat.Date_retour ? new Date(contrat.Date_retour).toISOString() : null,
        }));
        return handleResponse(res, contratsFormatte.length > 0 ? 200 : 404, contratsFormatte.length > 0 ? "Contrat retrieved successfully" : "No Contrat found", contratsFormatte);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving Contrat", { error: error.message });
    }
};
const getLastNumeroContrat = async (req, res) => {
    try {
        const lastNumeroContrat = await getLastContratNumberService();
        return handleResponse(res, 200, "Last contract number retrieved successfully", lastNumeroContrat);
    } catch (error) {
        console.error("Error fetching last Numero_contrat:", error);
        return handleResponse(res, 500, "Database error while fetching last contract number");
    }
};
const addContrat = async (req, res) => {
    try {
        const { error } = createContratSchema.validate(req.body);
        if (error) {
            return handleResponse(res, 400, "Validation error", error.details);
        }
        if (req.body.Numero_contrat) {
            delete req.body.Numero_contrat;
        }
        const data = await addContratServices(req.body);
        return handleResponse(res, 201, "Contrat added successfully", data);
    } catch (error) {
        console.error("Error adding contrat:", error);
        return handleResponse(res, 500, "An error occurred while adding Contrat", { error: error.message });
    }
};

const getContratById = async (req, res) => {
    try {
        const { ID_contrat } = req.params;
        const contrat = await getContratByIdServices(ID_contrat);
        if (!contrat) {
            return handleResponse(res, 404, "Contrat not found. Please check the number.");
        }
        const contratFormatte = {
            ...contrat.get({ plain: true }),
            Date_debut: contrat.Date_debut ? new Date(contrat.Date_debut).toISOString() : null,
            Date_retour: contrat.Date_retour ? new Date(contrat.Date_retour).toISOString() : null,
        };
        return handleResponse(res, 200, "Contrat retrieved successfully", contratFormatte);
    } catch (error) {
        return handleResponse(res, 500, "Error retrieving contract", { error: error.message });
    }
};
const getContratByCinClient = async (req, res) => {
    try {
        const { cin_client } = req.params;
        const contrats = await getContratByCinClientServices(cin_client);
        if (!contrats || contrats.length === 0) {
            return handleResponse(res, 404, "No contracts found for this CIN.");
        }
        const contratsFormatte = contrats.map(contrat => ({
            ...contrat.get({ plain: true }),
            Date_debut: contrat.Date_debut ? new Date(contrat.Date_debut).toISOString() : null,
            Date_retour: contrat.Date_retour ? new Date(contrat.Date_retour).toISOString() : null,
        }));
        return handleResponse(res, 200, "Contracts retrieved successfully", contratsFormatte);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving contracts", { error: error.message });
    }
};
const updateContrat = async (req, res) => {
    try {
        const { ID_contrat } = req.params;
        const updatedContrat = await updateContratService(ID_contrat, req.body);
        return handleResponse(res, updatedContrat ? 200 : 404, updatedContrat ? "Contrat updated successfully" : "Contrat not found", updatedContrat ? updatedContrat.get({ plain: true }) : null);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while updating Contrat", { error: error.message });
    }
};

const deleteContrat = async (req, res) => {
    try {
        const { ID_contrat } = req.params;
        const deleted = await deleteContratService(ID_contrat);
        if (deleted) {
            return handleResponse(res, 200, "Contrat deleted successfully");
        } else if (deleted === 0) {
            return handleResponse(res, 404, "Contrat not found or already deleted");
        }
    } catch (error) {
        if (error.message.includes("lié à une réservation")) {
            return handleResponse(res, 400, error.message);
        }
        console.error("Error deleting contrat:", error);
        return handleResponse(res, 500, "An error occurred while deleting Contrat", { error: error.message });
    }
};

const checkContratAssociations = async (req, res) => {
    try {
        const { Numero_contrat } = req.params;
        const associationsContrat = await checkContratAssociationsService(Numero_contrat);
        res.status(200).json(associationsContrat);
    } catch (error) {
        console.error("Erreur dans checkContratAssociations:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateContratSolde = async (req, res) => {
    try {
        const { ID_contrat } = req.params;
        const { error } = updateSoldeContratSchema.validate(req.body);
        if (error) {
            return handleResponse(res, 400, "Validation error", error.details);
        }
        const { solde} = req.body;
        const updatedContrat = await updateContratSoldeService(ID_contrat, solde);
        return handleResponse(res, updatedContrat ? 200 : 404, updatedContrat ? "Contrat solde updated successfully" : "Contrat not found", updatedContrat ? updatedContrat.get({ plain: true }) : null);
    } catch (error) {
        console.error("Error updating contrat solde:", error);
        return handleResponse(res, 500, "An error occurred while updating Contrat solde", { error: error.message });
    }
};

module.exports = {
    getContrat,
    getLastNumeroContrat,
    addContrat,
    getContratById,
    updateContrat,
    deleteContrat, // Using the modified delete controller action
    getContratByCinClient,
    checkContratAssociations,
    updateContratSolde
};