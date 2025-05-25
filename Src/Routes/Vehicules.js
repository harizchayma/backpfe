const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Create a multer instance

const {
    getVehicules,
    addVehicules,
    getVehiculesById,
    updateVehicules,
    deleteVehicules,
    getVehiculeByNumImmatriculation,
    checkVehiculeAssociations
} = require('../Controllers/VehiculesController');

// Define routes
router.get('/', getVehicules);
router.get('/immatriculation/:num_immatriculation', getVehiculeByNumImmatriculation);
router.post('/', addVehicules);
router.get('/:id_vehicule', getVehiculesById);
router.put('/:num_immatriculation', upload.single('image'), updateVehicules); // Apply multer here
router.delete('/:num_immatriculation', deleteVehicules);
router.get('/check/:num_immatriculation', checkVehiculeAssociations); // Corrected route path

module.exports = router;