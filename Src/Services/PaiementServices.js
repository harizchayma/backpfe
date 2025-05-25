const Paiement = require("../Model/PaiementModel");

const getPaiementServices = async () => {
    try {
        return await Paiement.findAll();
    } catch (error) {
        console.error('Error fetching Paiement:', error);
        throw new Error("Database error while fetching payments");
    }
};

const getLastNumeroPaiement = async () => {
    try {
        const lastPaiement = await Paiement.findOne({
            order: [['Id_paiement', 'DESC']],
            attributes: ['Numero_paiement']
        });
        return lastPaiement ? lastPaiement.Numero_paiement : null;
    } catch (error) {
        console.error("Error fetching last numero_paiement:", error);
        throw new Error("Database error while fetching last payment number");
    }
};

const addPaiementServices = async (body) => {
    try {
        const lastNumeroPaiement = await getLastNumeroPaiement();
        let newNumeroPaiement;

        if (lastNumeroPaiement) {
            const lastNumber = parseInt(lastNumeroPaiement.slice(1), 10);
            const nextNumber = lastNumber + 1;
            newNumeroPaiement = `P${nextNumber.toString().padStart(4, '0')}`;
        } else {
            newNumeroPaiement = 'P0001';
        }
        body.montant_paiement = (parseFloat(body.montant_cheque1) || 0) + 
        (parseFloat(body.montant_cheque2) || 0) + 
        (parseFloat(body.montant_espace) || 0) + 
        (parseFloat(body.montant_virement) || 0);
        body.Numero_paiement = newNumeroPaiement;
        const createdPaiement = await Paiement.create(body);
        return createdPaiement;
    } catch (error) {
        console.error("Database error while adding payment:", error);
        console.error("Sequelize details:", error);
        throw new Error("Database error while adding payment");
    }
};

const getPaiementByIdServices = async (Id_paiement) => {
    try {
        const paiement = await Paiement.findOne({ where: { Id_paiement } });
        return paiement;
    } catch (error) {
        console.error("Error fetching paiement by ID:", error);
        throw new Error("Database error while fetching payment by ID");
    }
};

const updatePaiementService = async (Id_paiement, body) => {
    try {
        body.montant_paiement = (parseFloat(body.montant_cheque1) || 0) + 
        (parseFloat(body.montant_cheque2) || 0) + 
        (parseFloat(body.montant_espace) || 0) + 
        (parseFloat(body.montant_virement) || 0);
        const [updated] = await Paiement.update(body, {
            where: { Id_paiement },
        });
        return updated ? await Paiement.findByPk(Id_paiement) : null;
    } catch (error) {
        console.error("Error updating Paiement:", error);
        throw new Error("Database error while updating payment");
    }
};

const deletePaiementService = async (Id_paiement) => {
    try {
        const deleted = await Paiement.destroy({
            where: { Id_paiement }
        });
        return deleted;
    } catch (error) {
        console.error("Error deleting Paiement:", error);
        throw new Error("Database error while deleting payment");
    }
};

const getPaiementsByContratIdServices = async (contrat_id) => {
    try {
        return await Paiement.findAll({
            where: { Numero_contrat: contrat_id }
        });
    } catch (error) {
        console.error("Error fetching payments by contract ID:", error);
        throw new Error("Database error while fetching payments by contract ID");
    }
};

const getPaiementsByCinClientServices = async (cin_client) => {
  try {
      return await Paiement.findAll({
          where: { cin_client: cin_client }
      });
  } catch (error) {
      console.error("Error fetching payments by CIN client:", error);
      throw new Error("Database error while fetching payments by CIN client");
  }
};

module.exports = {
    getPaiementServices,
    addPaiementServices,
    getPaiementByIdServices,
    updatePaiementService,
    deletePaiementService,
    getPaiementsByContratIdServices,
    getPaiementsByCinClientServices // Export the new service function
};