const {
    getChauffeurServices,
    addChauffeurServices,
    getChauffeurByIdServices,
    updateChauffeurService,
    deleteChauffeurService
} = require("../Services/ChauffeurServices");

const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ statusCode, message, data });
};

const getChauffeur = async (req, res) => {
    try {
        const data = await getChauffeurServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Chauffeurs retrieved successfully" : "No chauffeurs found", data);
    } catch (error) {
        console.error("Error retrieving chauffeurs:", error);
        return handleResponse(res, 500, "An error occurred while retrieving chauffeurs", { error: error.message });
    }
};

const addChauffeur = async (req, res) => {
    console.log("Received body:", req.body);
    try {
        const data = await addChauffeurServices(req.body);
        return handleResponse(res, 201, "Chauffeur added successfully", data);
    } catch (error) {
        console.error("Error adding chauffeur:", error);
        return handleResponse(res, 400, error.message, null);
    }
};

const getChauffeurById = async (req, res) => {
    try {
        const data = await getChauffeurByIdServices(req.params.id_chauffeur);
        return handleResponse(res, data ? 200 : 404, data ? "Chauffeur retrieved successfully" : "Chauffeur not found", data);
    } catch (error) {
        console.error("Error retrieving chauffeur by ID:", error);
        return handleResponse(res, 500, "An error occurred while retrieving chauffeur", { error: error.message });
    }
};

const updateChauffeur = async (req, res) => {
    try {
        const { id_chauffeur } = req.params;
        const updatedChauffeur = await updateChauffeurService(id_chauffeur, req.body);
        return handleResponse(res, updatedChauffeur ? 200 : 404, updatedChauffeur ? "Chauffeur updated successfully" : "Chauffeur not found", updatedChauffeur);
    } catch (error) {
        console.error("Error updating chauffeur:", error);
        return handleResponse(res, 500, "An error occurred while updating chauffeur", { error: error.message });
    }
};

const deleteChauffeur = async (req, res) => {
    try {
        const { id_chauffeur } = req.params;
        const chauffeur = await getChauffeurByIdServices(id_chauffeur);
        if (!chauffeur) {
            return handleResponse(res, 404, "Chauffeur not found");
        }
        await deleteChauffeurService(id_chauffeur);
        return handleResponse(res, 200, "Chauffeur deleted successfully");
    } catch (error) {
        console.error("Error deleting chauffeur:", error);
        return handleResponse(res, 500, "An error occurred while deleting chauffeur", { error: error.message });
    }
};

module.exports = {
    getChauffeur,
    addChauffeur,
    getChauffeurById,
    updateChauffeur,
    deleteChauffeur
};