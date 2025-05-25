const Contrat = require("../Model/ContratModel");
const Avance = require("../Model/AvanceModel");
const Paiement = require("../Model/PaiementModel");
const Reservation = require("../Model/ReservationModel"); // Import Reservation model

const getContratServices = async () => {
    try {
        return await Contrat.findAll();
    } catch (error) {
        console.error('Error fetching Contrat:', error);
        throw new Error("Database error while fetching contracts");
    }
};
const getLastContratNumberService = async () => {
    try {
        const lastContrat = await Contrat.findOne({
            order: [['ID_contrat', 'DESC']],
            attributes: ['Numero_contrat'],
        });
        return lastContrat ? lastContrat.Numero_contrat : null;
    } catch (error) {
        console.error("Error in getLastContratNumberService:", error);
        throw error;
    }
};
const getContratByCinClientServices = async (cin_client) => {
    try {
        return await Contrat.findAll({
            where: { cin_client: cin_client }
        });
    } catch (error) {
        console.error("Error fetching contracts by CIN:", error);
        throw new Error("Database error while fetching contracts by CIN");
    }
};

const getLastNumeroContrat = async () => {
    try {
        const lastContrat = await Contrat.findOne({
            order: [['ID_contrat', 'DESC']],
            attributes: ['Numero_contrat']
        });
        return lastContrat ? lastContrat.Numero_contrat : null;
    } catch (error) {
        console.error("Error fetching last Numero_contrat:", error);
        throw new Error("Database error while fetching last contract number");
    }
};

const addContratServices = async (body) => {
    try {
        const lastNumeroContrat = await getLastNumeroContrat();
        let newNumeroContrat;

        if (lastNumeroContrat) {
            const lastNumber = parseInt(lastNumeroContrat.slice(2));
            const nextNumber = lastNumber + 1;
            newNumeroContrat = `AC${nextNumber.toString().padStart(4, '0')}`;
        } else {
            newNumeroContrat = 'AC0001';
        }

        body.Numero_contrat = newNumeroContrat;
        return await Contrat.create(body);
    } catch (error) {
        console.error("Error adding Contrat:", error);
        throw new Error("Database error while adding contract");
    }
};

const getContratByIdServices = async (ID_contrat) => {
    try {
        const contrat = await Contrat.findOne({ where: { ID_contrat } });
        return contrat;
    } catch (error) {
        console.error("Error fetching contrat by ID:", error);
        throw new Error("Database error while fetching contract by ID");
    }
};

const updateContratService = async (ID_contrat, body) => {
    try {
        const [updated] = await Contrat.update(body, {
            where: { ID_contrat },
        });
        return updated ? await Contrat.findByPk(ID_contrat) : null;
    } catch (error) {
        console.error("Error updating Contrat:", error);
        throw new Error("Database error while updating contract");
    }
};

const updateContratSoldeService = async (ID_contrat, solde) => {
    try {
        const [updated] = await Contrat.update({ solde: solde }, {
            where: { ID_contrat },
        });
        return updated ? await Contrat.findByPk(ID_contrat) : null;
    } catch (error) {
        console.error("Error updating Contrat solde:", error);
        throw new Error("Database error while updating contract solde");
    }
};

const deleteContratService = async (ID_contrat) => {
    try {
        const contrat = await Contrat.findByPk(ID_contrat);
        if (!contrat) {
            return 0; // Indicate not found
        }

        // Check if the contract has an id_reservation
        if (contrat.id_reservation !== null) {
            throw new Error("Ce contrat est lié à une réservation et ne peut pas être supprimé directement.");
        }

        const deleted = await Contrat.destroy({
            where: { ID_contrat }
        });
        return deleted;
    } catch (error) {
        console.error("Error deleting Contrat:", error);
        throw error; // Re-throw the error
    }
};
const checkContratAssociationsService = async (Numero_contrat) => {
    try {
        const activeAvance = await Avance.findAll({
            where: {
                Numero_contrat: Numero_contrat,
            }
        });

        const activePaiement = await Paiement.findAll({
            where: {
                Numero_contrat: Numero_contrat,
            }
        });

        const hasAssociations = activeAvance.length > 0 || activePaiement.length > 0;
        return { hasAssociations };
    } catch (error) {
        console.error(
            "Erreur lors de la vérification des associations du Contrat:",
            error
        );
        throw new Error("Impossible de vérifier les associations du Contrat");
    }
};
module.exports = {
    getContratServices,
    getLastContratNumberService,
    addContratServices,
    getContratByIdServices,
    updateContratService,
    deleteContratService, // Modified delete service
    getContratByCinClientServices,
    checkContratAssociationsService,
    updateContratSoldeService
};