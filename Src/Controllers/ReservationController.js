const { createReservationSchema, findIdReservationSchema, updateActionSchema } = require('../Validations/ReservationValidation');
const {
    getReservationServices,
    getReservationServicesByCin,
    addReservationServices,
    getReservationByIdServices,
    updateReservationService,
    deleteReservationService,
    updateReservationActionService
} = require("../Services/ReservationServices");

const handleResponse = (res, statusCode, message, data, errorDetails = null) => {
    res.status(statusCode).json({
        message: message,
        data: data,
        ...(errorDetails && { error: errorDetails }),
    });
};

const getReservation = async (req, res) => {
    try {
        const data = await getReservationServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Réservations récupérées avec succès" : "Aucune réservation trouvée", data);
    } catch (error) {
        return handleResponse(res, 500, "Une erreur est survenue lors de la récupération des réservations", null, error.message);
    }
};

const getReservationByCin = async (req, res) => {
    const { cin_client } = req.params;

    try {
        const data = await getReservationServicesByCin(cin_client);
        return handleResponse(res, data.length ? 200 : 404,
            data.length ? "Réservations récupérées avec succès" : "Aucune réservation trouvée",
            data);
    } catch (error) {
        console.error("Error fetching reservations by cin:", error);
        return handleResponse(res, 500, "Une erreur est survenue lors de la récupération des réservations", null, error.message);
    }
};

const addReservation = async (req, res) => {
    try {
        console.log("Server received reservation data:", JSON.stringify(req.body));

        const { error } = createReservationSchema.validate(req.body);
        if (error) {
            console.error("Erreur de validation :", error.details);
            return res.status(400).json({ message: "Erreur de validation", error: error.details });
        }

        const isMobileRequest = true; // Adjust this logic if needed
        const data = await addReservationServices(req.body, isMobileRequest);
        return res.status(201).json({ message: "Réservation ajoutée avec succès", data: data });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation:", error);
        return res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de la réservation", error: error.message });
    }
};

const getReservationById = async (req, res) => {
    try {
        const { id_reservation } = req.params;
        const data = await getReservationByIdServices(id_reservation);
        if (!data) {
            return handleResponse(res, 404, "Réservation non trouvée. Veuillez vérifier le numéro.");
        }
        return handleResponse(res, 200, "Réservation récupérée avec succès", data);
    } catch (error) {
        return handleResponse(res, 500, "Erreur lors de la récupération de la réservation", null, error.message);
    }
};

const updateReservation = async (req, res) => {
    console.log("updateReservation called with params:", req.params, "and body:", req.body);
    try {
        const { id_reservation } = req.params;

        const { error } = findIdReservationSchema.validate({ id_reservation });
        if (error) {
            return res.status(400).json({ message: "Invalid reservation ID", error: error.details });
        }

        const { error: bodyError } = createReservationSchema.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ message: "Invalid request body", error: bodyError.details });
        }
        const updatedReservation = await updateReservationService(id_reservation, req.body);
        console.log("updateReservationService result:", updatedReservation);
        if (!updatedReservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }
        return res.json({ message: "Réservation mise à jour avec succès", data: updatedReservation });
    } catch (error) {
        console.error("Error updating reservation:", error);
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const { id_reservation } = req.params;
         const { error } = findIdReservationSchema.validate({ id_reservation });
          if (error) {
            return res.status(400).json({ message: "Invalid reservation ID", error: error.details });
        }
        const reservation = await getReservationByIdServices(id_reservation);
        if (!reservation) {
            return handleResponse(res, 404, "Réservation non trouvée");
        }

        const result = await deleteReservationService(id_reservation);
        if (result === 0) {
            return handleResponse(res, 404, "Réservation non trouvée ou déjà supprimée");
        }

        return handleResponse(res, 200, "Réservation supprimée avec succès", reservation);
    } catch (error) {
        console.error("Erreur lors de la suppression de la réservation:", error);
        return handleResponse(res, 500, "Une erreur est survenue lors de la suppression de la réservation", { error: error.message });
    }
};

const updateReservationAction = async (req, res) => {
    console.log("updateReservationAction called with params:", req.params, "and body:", req.body);
    try {
        const { id_reservation } = req.params;
         const { error: idError } = findIdReservationSchema.validate({ id_reservation });
          if (idError) {
            return res.status(400).json({ message: "Invalid reservation ID", error: idError.details });
        }
        const { error: actionError } = updateActionSchema.validate(req.body);
        if (actionError) {
             return res.status(400).json({ message: "Invalid action or login_id", error: actionError.details });
        }
        const { action, login_id } = req.body;

        const updatedReservation = await updateReservationActionService(id_reservation, { action, login_id });
        console.log("updateReservationActionService résultat :", updatedReservation);

        if (!updatedReservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }
        return res.json({ message: "Action de la réservation mise à jour avec succès", data: updatedReservation });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'action de la réservation :", error);
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports = {
    getReservation,
    getReservationByCin,
    addReservation,
    getReservationById,
    updateReservation,
    deleteReservation,
    updateReservationAction
};
