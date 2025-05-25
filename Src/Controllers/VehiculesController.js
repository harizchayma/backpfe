const {
    getVehiculesServices,
    getVehiculeByNumImmatriculationServices,
    addVehiculesServices,
    getVehiculesByIdServices,
    updateVehiculesService,
    deleteVehiculesService,
    checkVehiculeAssociationsService,
} = require("../Services/VehiculesServices");

const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        data,
    });
};

const getVehicules = async (req, res) => {
    try {
        let vehicles = await getVehiculesServices();
        vehicles = vehicles.map(vehicle => {
            if (vehicle.image) {
                vehicle.image = vehicle.image.toString('base64'); // Convert BLOB to base64
            }
            return vehicle;
        });
        return handleResponse(res, vehicles.length > 0 ? 200 : 404, vehicles.length > 0 ? "Vehicles retrieved successfully" : "No vehicles found", vehicles);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving vehicles", { error: error.message });
    }
};

const getVehiculeByNumImmatriculation = async (req, res) => {
    const { num_immatriculation } = req.params;
    try {
        let vehicle = await getVehiculeByNumImmatriculationServices(num_immatriculation);
        if (vehicle && vehicle.image) {
            vehicle.image = vehicle.image.toString('base64');
        }
        if (!vehicle) {
            return handleResponse(res, 404, "Vehicle not found");
        }
        return handleResponse(res, 200, "Vehicle retrieved successfully", vehicle);
    } catch (error) {
        console.error("Error retrieving vehicle by registration number:", error);
        return handleResponse(res, 500, "An error occurred while retrieving vehicle", { error: error.message });
    }
};

const addVehicules = async (req, res) => {
    console.log("Received body:", req.body); // Log the incoming request body
    try {
        const data = await addVehiculesServices(req.body);
        return handleResponse(res, 201, "Vehicle added successfully", data);
    } catch (error) {
        console.error("Error adding vehicle:", error);
        return handleResponse(res, 400, "cette vehicule déjà existé", { error: error.message });
    }
};
const getVehiculesById = async (req, res) => {
    const { id_vehicule } = req.params;
    try {
        let vehicle = await getVehiculesByIdServices(id_vehicule);
        if (vehicle && vehicle.image) {
            vehicle.image = vehicle.image.toString('base64');
        }
        if (!vehicle) {
            return handleResponse(res, 404, "Vehicle not found");
        }
        return handleResponse(res, 200, "Vehicle retrieved successfully", vehicle);
    } catch (error) {
        console.error("Erreur dans la récupération du véhicule :", error);
        return handleResponse(res, 500, "An error occurred while retrieving vehicle", { error: error.message });
    }
};
const updateVehicules = async (req, res) => {
    console.log("Données reçues pour mise à jour (body):", req.body);
    console.log("Fichier image reçu (file):", req.file);

    try {
        const { num_immatriculation } = req.params;
        const updateData = { ...req.body }; // Start with the text fields

        if (req.file) {
            updateData.image = req.file.buffer; // Access the file buffer
        }

        const updatedVehicle = await updateVehiculesService(num_immatriculation, updateData);
        return handleResponse(res, updatedVehicle ? 200 : 404, updatedVehicle ? "Vehicle updated successfully" : "Vehicle not found", updatedVehicle);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while updating vehicle", { error: error.message });
    }
};

const deleteVehicules = async (req, res) => {
    try {
        const { num_immatriculation } = req.params;
        const hasAssociations = await checkVehiculeAssociationsService(num_immatriculation);
        if (hasAssociations.hasAssociations) {
            return handleResponse(res, 400, "Cannot delete vehicle as it has existing contracts or reservations.");
        }
        const deleted = await deleteVehiculesService(num_immatriculation);
        return handleResponse(res, deleted ? 200 : 404, deleted ? "Vehicle deleted successfully" : "Vehicle not found");
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while deleting vehicle", { error: error.message });
    }
};
const checkVehiculeAssociations = async (req, res) => {
    try {
      const { num_immatriculation } = req.params;
      const associationsVehicule = await checkVehiculeAssociationsService(num_immatriculation);
      res.status(200).json(associationsVehicule);
    } catch (error) {
      console.error("Erreur dans checkVehiculeAssociations:", error);
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {
    getVehicules,
    addVehicules,
    getVehiculesById,
    updateVehicules,
    deleteVehicules,
    getVehiculeByNumImmatriculation,
    checkVehiculeAssociations
};