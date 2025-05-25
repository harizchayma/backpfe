const Chauffeur = require("../Model/ChauffeurModel");

const getChauffeurServices = async () => {
    try {
        return await Chauffeur.findAll();
    } catch (error) {
        console.error("Error fetching chauffeurs:", error);
        throw error;
    }
};

const addChauffeurServices = async (body) => {
    try {
        const exists = await Chauffeur.findOne({ where: { cin_chauffeur: body.cin_chauffeur } });
        if (exists) {
            throw new Error("Le chauffeur avec ce numéro de CIN existe déjà.");
        }
        console.log("Body received in addChauffeurServices:", body);
        return await Chauffeur.create(body);
    } catch (error) {
        console.error("Error adding chauffeur:", error);
        throw error;
    }
};

const getChauffeurByIdServices = async (id_chauffeur) => {
    try {
        return await Chauffeur.findByPk(id_chauffeur);
    } catch (error) {
        console.error("Error fetching chauffeur by ID:", error);
        throw error;
    }
};

const updateChauffeurService = async (id_chauffeur, body) => {
    try {
        const chauffeur = await Chauffeur.findByPk(id_chauffeur);
        if (!chauffeur) {
            return null;
        }
        await chauffeur.update(body);
        return chauffeur;
    } catch (error) {
        console.error("Error updating chauffeur:", error);
        throw error;
    }
};

const deleteChauffeurService = async (id_chauffeur) => {
    try {
        const deleted = await Chauffeur.destroy({ where: { id_chauffeur } });
        return deleted > 0;
    } catch (error) {
        console.error("Error deleting chauffeur:", error);
        throw error;
    }
};

module.exports = {
    getChauffeurServices,
    addChauffeurServices,
    getChauffeurByIdServices,
    updateChauffeurService,
    deleteChauffeurService
};