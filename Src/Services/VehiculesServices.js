const Vehicules = require("../Model/VehiculesModel");
const Contrat = require("../Model/ContratModel");
const Reservation = require("../Model/ReservationModel");
const { Op } = require("sequelize"); // Import Sequelize Operators

const getVehiculesServices = async () => {
    try {
        return await Vehicules.findAll();
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};
const getVehiculeByNumImmatriculationServices = async (num_immatriculation) => {
    try {
        const vehicle = await Vehicules.findOne({
            where: { num_immatriculation }
        });
        return vehicle;
    } catch (error) {
        console.error("Error fetching vehicle by registration number:", error);
        throw error;
    }
};
const addVehiculesServices = async (body) => {
    try {
        const exists = await Vehicules.findByPk(body.num_immatriculation);
        if (exists) {
            throw new Error("Le véhicule avec ce numéro d'immatriculation existe déjà.");
        }
        return await Vehicules.create(body);
    } catch (error) {
        console.error("Error adding vehicle:", error);
        throw error;
    }
};

const getVehiculesByIdServices = async (id_vehicule) => {
    try {
        const vehicle = await Vehicules.findOne({ where: { id_vehicule } });
        return vehicle;
    } catch (error) {
        console.error("Erreur lors de la récupération du véhicule:", error);
        throw error;
    }
};
const updateVehiculesService = async (num_immatriculation, body) => {
    try {
        const [updated] = await Vehicules.update(body, {
            where: { num_immatriculation: num_immatriculation },
        });
        return updated ? await Vehicules.findOne({ where: { num_immatriculation } }) : null;
    } catch (error) {
        console.error("Error updating vehicle:", error);
        throw error;
    }
};
const deleteVehiculesService = async (num_immatriculation) => {
    try {
        const deleted = await Vehicules.destroy({
            where: { num_immatriculation: num_immatriculation }
        });
        return deleted ? true : false;
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        throw error;
    }
};

const checkVehiculeAssociationsService = async (num_immatriculation) => {
    try {
        const now = new Date();

        const activeContracts = await Contrat.findAll({
            where: {
                num_immatriculation: num_immatriculation,
                Date_retour: {
                    [Op.gte]: now.toISOString().slice(0, 10) // Check if return date is today or in the future
                }
            }
        });

        const activeReservations = await Reservation.findAll({
            where: {
                num_immatriculation: num_immatriculation,
                Date_retour: {
                    [Op.gte]: now.toISOString().slice(0, 10) // Check if return date is today or in the future
                }
            }
        });

        const hasAssociations = activeContracts.length > 0 || activeReservations.length > 0;
        return { hasAssociations };
    } catch (error) {
        console.error(
            "Erreur lors de la vérification des associations du Vehicule:",
            error
        );
        throw new Error("Impossible de vérifier les associations du Vehicule");
    }
};

module.exports = {
    getVehiculesServices,
    addVehiculesServices,
    getVehiculesByIdServices,
    updateVehiculesService,
    deleteVehiculesService,
    getVehiculeByNumImmatriculationServices,
    checkVehiculeAssociationsService
};