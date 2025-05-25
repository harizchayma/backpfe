const Client = require("../Model/ClientModel");
const { Contrat } = require("../Model/associations"); // Import Contrat from associations
const Reservation = require("../Model/ReservationModel");
const { validateBody } = require("../Middleware/Validation");

const {
  getClientServices,
  addClientServices,
  getClientByIdServices,
  updateClientService,
  deleteClientService,
  getClientByCINService,
  verifyPassword,
  updateClientLoginInfoService,
  checkClientAssociationsService, 
  updateClientFidelStatusService,
  sendPasswordEmailService 
} = require("../Services/ClientServices");

const handleResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({ statusCode, message, data });
};

const getClient = async (req, res) => {
  try {
    const data = await getClientServices();
    return handleResponse(
      res,
      200,
      data.length > 0 ? "Clients récupérés avec succès" : "Aucun client trouvé",
      data
    );
  } catch (error) {
    return handleResponse(res, 500, error.message, { error: error.message });
  }
};

const getClientByCIN = async (req, res) => {
  const { cin_client } = req.query; // Get the cin_client from the query parameters
  try {
    const client = await getClientByCINService(cin_client);
    if (client) {
      return handleResponse(res, 200, "Client récupéré avec succès", client);
    } else {
      return handleResponse(res, 404, "Client non trouvé");
    }
  } catch (error) {
    return handleResponse(res, 500, error.message, { error: error.message });
  }
};

const addClient = async (req, res) => {
  try {
    console.log("Corps reçu:", req.body);
    const data = await addClientServices(req.body);
    return handleResponse(res, 201, "Client ajouté avec succès", data);
  } catch (error) {
    return handleResponse(res, 400, "cette client déjà existé", { error: error.message });
  }
};

const loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
      const client = await Client.findOne({ where: { email } });

      if (!client) {
          return handleResponse(res, 404, "Client non trouvé");
      }

      const isPasswordValid = await verifyPassword(password, client.password);
      if (!isPasswordValid) {
          return handleResponse(res, 401, "Mot de passe invalide");
      }

      return handleResponse(res, 200, "Connexion réussie", {
        id_client: client.id_client,
          cin_client: client.cin_client,
          nom: client.nom_fr,       // Include nom
          prenom: client.prenom_fr, // Include prenom
      });
  } catch (error) {
      return handleResponse(res, 500, error.message, { error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const data = await getClientByIdServices(req.params.id_client);
    return handleResponse(
      res,
      data ? 200 : 404,
      data ? "Client récupéré avec succès" : "Client non trouvé",
      data
    );
  } catch (error) {
    return handleResponse(res, 500, error.message, { error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id_client } = req.params;
    const updatedClient = await updateClientService(id_client, req.body);
    return handleResponse(
      res,
      updatedClient ? 200 : 404,
      updatedClient ? "Client mis à jour avec succès" : "Client non trouvé",
      updatedClient
    );
  } catch (error) {
    return handleResponse(res, 500, error.message, { error: error.message });
  }
};


const updateClientLoginInfo = async (req, res) => {
  const { id_client } = req.params;
  const { email, password } = req.body;

  try {
    const updatedClient = await updateClientLoginInfoService(
      id_client,
      email,
      password
    );
    if (updatedClient) {
      return handleResponse(
        res,
        200,
        "Informations de connexion mises à jour avec succès",
        updatedClient
      );
    } else {
      return handleResponse(res, 404, "Client non trouvé");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations de connexion:",
      error
    );
    return handleResponse(res, 500, error.message, { error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id_client } = req.params;
    const clientExists = await getClientByIdServices(id_client);
    if (!clientExists) {
      return handleResponse(res, 404, "Client non trouvé");
    }

    // Vérifiez les associations avant de supprimer
    const { hasAssociations } = await checkClientAssociationsService(id_client);
    if (hasAssociations) {
      return handleResponse(
        res,
        400,
        "Ce client ne peut pas être supprimé car il a des contrats ou des réservations en cours."
      );
    }

    await deleteClientService(id_client);
    return handleResponse(res, 200, "Client supprimé avec succès");
  } catch (error) {
    return handleResponse(res, 500, error.message, { error: error.message });
  }
};



const checkClientAssociations = async (req, res) => {
  try {
    const { id_client } = req.params;
    const associations = await checkClientAssociationsService(id_client);
    res.status(200).json(associations);
  } catch (error) {
    console.error("Erreur dans checkClientAssociations:", error);
    res.status(500).json({ message: error.message });
  }
};
const updateClientFidelStatus = async (req, res) => {
  try {
      const { id_client } = req.params;
      const { is_fidel } = req.body; // Expecting is_fidel in the request body

      const updatedClient = await updateClientFidelStatusService(id_client, is_fidel);
      return handleResponse(
          res,
          updatedClient ? 200 : 404,
          updatedClient ? "Statut fidel mis à jour avec succès" : "Client non trouvé",
          updatedClient
      );
  } catch (error) {
      return handleResponse(res, 500, error.message, { error: error.message });
  }
};
const sendPasswordEmail = async (req, res) => {
  const { email } = req.body; // Récupérez l'e-mail du destinataire depuis le corps de la requête
  const clientEmail = "RanderCar@outlook.fr"; // L'e-mail de votre société (à sécuriser via variables d'environnement)
  const clientPassword = "VOTRE_MOT_DE_PASSE_D_APPLICATION"; // Le mot de passe d'application sécurisé (à sécuriser via variables d'environnement)

  if (!email) {
    return handleResponse(res, 400, "L'adresse e-mail du destinataire est requise.");
  }

  try {
    const result = await sendPasswordEmailService(email, clientEmail, clientPassword);
    if (result.success) {
      return handleResponse(res, 200, result.message);
    } else {
      return handleResponse(res, 400, result.message);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    return handleResponse(res, 500, error.message, { error: error.message });
  }
};

module.exports = {
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
  sendPasswordEmail,
};