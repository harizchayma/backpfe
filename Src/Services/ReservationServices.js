const Reservation = require("../Model/ReservationModel");
const Contrat = require("../Model/ContratModel"); // Import the Contrat model

const getReservationServices = async () => {
    try {
        return await Reservation.findAll();
    } catch (error) {
        console.error('Error fetching Reservations:', error);
        throw new Error("Database error while fetching reservations");
    }
};

const getReservationServicesByCin = async (cin_client) => {
    try {
        return await Reservation.findAll({ where: { cin_client } });
    } catch (error) {
        console.error("Error fetching Reservations by CIN:", error);
        throw new Error("Database error while fetching reservations by cin");
    }
};

const addReservationServices = async (body, isMobile = false) => {
    try {
        const reservationData = { ...body };
        if (isMobile) {
            delete reservationData.login_id;
        }
        return await Reservation.create(reservationData);
    } catch (error) {
        console.error("Error adding Reservation:", error);
        throw new Error("Database error while adding reservation");
    }
};

const getReservationByIdServices = async (id_reservation) => {
    try {
        const reservation = await Reservation.findByPk(id_reservation);
        return reservation;
    } catch (error) {
        console.error("Error fetching reservation by ID:", error);
        throw new Error("Database error while fetching reservation by ID");
    }
};

const updateReservationService = async (id_reservation, body) => {
    console.log("updateReservationService called with id:", id_reservation, "and body:", body);
    try {
        const [rowsAffected] = await Reservation.update(body, {
            where: { id_reservation },
        });

        if (rowsAffected > 0) {
            return await Reservation.findByPk(id_reservation);
        } else {
            return null; // No rows were updated, reservation not found or no changes
        }
    } catch (error) {
        console.error("Error updating Reservation:", error);
        throw new Error("Database error while updating reservation");
    }
};

const deleteReservationService = async (id_reservation) => {
    try {
        // Check if any contracts are using this reservation
        const contratUsingReservation = await Contrat.findOne({
            where: { id_reservation: id_reservation }
        });

        if (contratUsingReservation) {
            throw new Error("Cette réservation est liée à un contrat et ne peut pas être supprimée.");
        }

        // If no associated contracts, proceed with deletion
        const deleted = await Reservation.destroy({
            where: { id_reservation }
        });
        return deleted;
    } catch (error) {
        console.error("Error deleting Reservation:", error);
        throw error; // Re-throw the error to be caught in the controller
    }
};

const updateReservationActionService = async (id_reservation, { action, login_id }) => {
    console.log("updateReservationActionService called with id :", id_reservation, "and action :", action, "and login_id :", login_id);
    try {
        const updates = { action };
        if (login_id !== undefined) { // Check if login_id is provided
            updates.login_id = login_id;
        }

        const [rowsAffected] = await Reservation.update(
            updates,
            { where: { id_reservation } }
        );

        if (rowsAffected > 0) {
            return await Reservation.findByPk(id_reservation);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error updating reservation action:", error);
        throw new Error("Database error while updating reservation action");
    }
};

module.exports = {
    getReservationServices,
    getReservationServicesByCin,
    addReservationServices,
    getReservationByIdServices,
    updateReservationService,
    deleteReservationService,
    updateReservationActionService
};