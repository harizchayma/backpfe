// Controllers/ContratChauffeurController.js
const {
  getContratChauffeurServices,
  addContratChauffeurServices,
  getContratChauffeurByIdServices,
  updateContratChauffeurService,
  deleteContratChauffeurService,
  getContratChauffeurByNumeroContratService,
} = require('../Services/ContratChauffeurServices');

const handleResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({ statusCode, message, data });
};

// Récupérer tous les contrats
const getContratChauffeur = async (req, res) => {
  try {
      const data = await getContratChauffeurServices();
      return handleResponse(
          res,
          data.length > 0 ? 200 : 404,
          data.length > 0 ? "Contrats récupérés avec succès" : "Aucun contrat trouvé",
          data
      );
  } catch (error) {
      console.error("Erreur lors de la récupération des contrats :", error);
      return handleResponse(res, 500, "Erreur interne", { error: error.message });
  }
};

// Ajouter un contrat
const addContratChauffeur = async (req, res) => {
  try {
      const data = await addContratChauffeurServices(req.body);
      return handleResponse(res, 201, "Contrat ajouté avec succès", data);
  } catch (error) {
      console.error("Error adding ContratChauffeur:", error);
      return handleResponse(res, 400, error.message);
  }
};

// Récupérer par ID
const getContratChauffeurById = async (req, res) => {
  try {
      const data = await getContratChauffeurByIdServices(req.params.id_contrat_chauffeur);
      if (!data) return handleResponse(res, 404, "Contrat non trouvé");
      return handleResponse(res, 200, "Contrat récupéré", data);
  } catch (error) {
      return handleResponse(res, 500, "Erreur interne", { error: error.message });
  }
};

// Récupérer par Numero Contrat
const getContratChauffeurByNumeroContrat = async (req, res) => {
  try {
      const data = await getContratChauffeurByNumeroContratService(req.params.numero_contrat);
      if (!data) return handleResponse(res, 404, "Contrat non trouvé");
      return handleResponse(res, 200, "Contrat récupéré", data);
  } catch (error) {
      return handleResponse(res, 500, "Erreur interne", { error: error.message });
  }
};

// Mise à jour
const updateContratChauffeur = async (req, res) => {
  try {
      const { id_contrat_chauffeur } = req.params;
      const updated = await updateContratChauffeurService(id_contrat_chauffeur, req.body);
      if (!updated) return handleResponse(res, 404, "Contrat non trouvé");
      return handleResponse(res, 200, "Contrat mis à jour", updated);
  } catch (error) {
      return handleResponse(res, 500, "Erreur interne", { error: error.message });
  }
};

// Suppression
const deleteContratChauffeur = async (req, res) => {
  try {
      const { id_contrat_chauffeur } = req.params;
      const exists = await getContratChauffeurByIdServices(id_contrat_chauffeur);
      if (!exists) return handleResponse(res, 404, "Contrat non trouvé");
      const deleted = await deleteContratChauffeurService(id_contrat_chauffeur);
      if (deleted) return handleResponse(res, 200, "Contrat supprimé");
      else return handleResponse(res, 404, "Contrat non trouvé");
  } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      return handleResponse(res, 500, "Erreur interne", { error: error.message });
  }
};

module.exports = {
  getContratChauffeur,
  addContratChauffeur,
  getContratChauffeurById,
  updateContratChauffeur,
  deleteContratChauffeur,
  getContratChauffeurByNumeroContrat,
};