const ContratChauffeur = require('../Model/ContratChauffeurModel');

const getContratChauffeurServices = async () => {
    return await ContratChauffeur.findAll();
};

const addContratChauffeurServices = async (body) => {
    const existingCount = await ContratChauffeur.count({
        where: { Numero_contrat: body.Numero_contrat }
    });
    if (existingCount >= 3) {
        throw new Error("Ce numéro de contrat a déjà été utilisé 3 fois.");
    }
    return await ContratChauffeur.create(body);
};

const getContratChauffeurByIdServices = async (id) => {
    return await ContratChauffeur.findByPk(id);
};

const updateContratChauffeurService = async (id, body) => {
    const contrat = await ContratChauffeur.findByPk(id);
    if (!contrat) return null;
    await contrat.update(body);
    return contrat;
};

const deleteContratChauffeurService = async (idContratChauffeur) => {
    const deletedCount = await ContratChauffeur.destroy({
        where: { idContratChauffeur: idContratChauffeur }
    });
    return deletedCount > 0;
};

// New service to get ContratChauffeur by Numero_contrat
const getContratChauffeurByNumeroContratService = async (Numero_contrat) => {
  return await ContratChauffeur.findAll({
    where: { Numero_contrat: Numero_contrat }
  });
};


module.exports = {
    getContratChauffeurServices,
    addContratChauffeurServices,
    getContratChauffeurByIdServices,
    updateContratChauffeurService,
    deleteContratChauffeurService,
    getContratChauffeurByNumeroContratService // Export the new service
};