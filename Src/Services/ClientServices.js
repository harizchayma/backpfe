const Client = require("../Model/ClientModel");
const { Contrat } = require("../Model/associations"); // Import Contrat from associations
const Reservation = require("../Model/ReservationModel");
const { validateBody } = require("../Middleware/Validation");
const argon2 = require("argon2");
const nodemailer = require("nodemailer");


const getClientServices = async () => {
  try {
    return await Client.findAll();
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
    throw new Error("Impossible de récupérer les clients");
  }
};

const addClientServices = async (body) => {
  try {
    const exists = await Client.findOne({
      where: { cin_client: body.cin_client },
    });
    if (exists) {
      throw new Error("Le client avec ce numéro de CIN existe déjà.");
    }

    // Hash the password before saving if provided
    if (body.password) {
      body.password = await argon2.hash(body.password);
    }
    // Si body.password n'est pas fourni, il restera undefined dans la base de données

    console.log("Corps reçu dans addClientServices:", body);
    return await Client.create(body);
  } catch (error) {
    console.error("Erreur lors de l'ajout du client:", error);
    throw new Error(error.message || "Impossible d'ajouter le client");
  }
};

const getClientByIdServices = async (id_client) => {
  try {
    return await Client.findByPk(id_client);
  } catch (error) {
    console.error("Erreur lors de la récupération du client par ID:", error);
    throw new Error("Impossible de récupérer le client");
  }
};

const getClientByCINService = async (cin_client) => {
  try {
    return await Client.findOne({ where: { cin_client } });
  } catch (error) {
    console.error("Erreur lors de la récupération du client par CIN:", error);
    throw new Error("Impossible de récupérer le client par CIN");
  }
};

const updateClientService = async (id_client, body) => {
  try {
    const client = await Client.findByPk(id_client);
    if (!client) {
      throw new Error("Client non trouvé");
    }

    // Update the client with the provided data, including is_fidel
    await client.update(body);
    return client;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error);
    throw new Error(error.message || "Impossible de mettre à jour le client");
  }
};


const deleteClientService = async (id_client) => {
  try {
    const deleted = await Client.destroy({ where: { id_client } });
    if (!deleted) {
      throw new Error("Client non trouvé ou impossible à supprimer");
    }
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error);
    throw new Error("Impossible de supprimer le client");
  }
};

const verifyPassword = async (inputPassword, storedPassword) => {
  return await argon2.verify(storedPassword, inputPassword);
};

const updateClientLoginInfoService = async (id_client, email, password) => {
  try {
    const client = await Client.findByPk(id_client);
    if (!client) {
      throw new Error("Client non trouvé");
    }

    const updateData = {};
    if (email !== undefined) {
      updateData.email = email;
    }
    if (password !== undefined) {
      updateData.password = await argon2.hash(password);
    }

    await client.update(updateData);
    return client;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations de connexion:",
      error
    );
    throw new Error(
      error.message || "Impossible de mettre à jour les informations de connexion"
    );
  }
};



const checkClientAssociationsService = async (id_client) => {
  try {
    const client = await Client.findByPk(id_client, {
      include: [
        { model: Contrat, as: "contrats" },
        { model: Reservation, as: "reservations" }, // Assuming you add this association
      ],
    });

    const hasAssociations =
      (client.contrats && client.contrats.length > 0) ||
      (client.reservations && client.reservations.length > 0);
    return { hasAssociations };
  } catch (error) {
    console.error(
      "Erreur lors de la vérification des associations du client:",
      error
    );
    throw new Error("Impossible de vérifier les associations du client");
  }
};
const updateClientFidelStatusService = async (id_client, is_fidel) => {
  try {
      const client = await Client.findByPk(id_client);
      if (!client) {
          throw new Error("Client non trouvé");
      }

      // Ensure is_fidel is a boolean (or can be coerced to one)
      const fidelStatus = Boolean(is_fidel);

      await client.update({ is_fidel: fidelStatus });
      return client;
  } catch (error) {
      console.error("Erreur lors de la mise à jour du statut fidel:", error);
      throw new Error(error.message || "Impossible de mettre à jour le statut fidel");
  }
};
const sendPasswordEmailService = async (recipientEmail, clientPassword, senderEmail, senderPassword) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: recipientEmail,
      subject: "Bienvenue chez RanderCar",
      html: `<p>Bonjour,</p><p>Merci pour votre inscription chez <strong>RanderCar</strong>.</p>
             <p>Voici votre mot de passe : <strong>${clientPassword}</strong></p>
             <p>Cordialement,</p><p>RanderCar</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail envoyé :", info);
    return { success: true, message: "E-mail envoyé avec succès." };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    return { success: false, message: "Erreur lors de l'envoi de l'e-mail." };
  }
};


module.exports = {
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
};