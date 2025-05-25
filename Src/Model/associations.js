const Vehicule = require("./VehiculesModel");
const Contrat = require("./ContratModel");
const Reservation = require("./ReservationModel");
const Client = require("./ClientModel"); // Assuming you have a ClientModel
const Categorie = require('../Model/CategorieModel')
const Avance = require('./AvanceModel'); // Import Avance model
const Paiement = require('./PaiementModel'); // Import Paiement model

Client.hasMany(Contrat, {
  foreignKey: 'cin_client', // Use 'cin_client' as the foreign key in contrat
  as: 'contrats'
});

Contrat.belongsTo(Client, {
  foreignKey: 'cin_client', // Use 'cin_client' as the foreign key in contrat
  as: 'client',
  targetKey: 'cin_client' // Specify the target key in the Client model
});

Vehicule.hasMany(Contrat, {
  foreignKey: 'num_immatriculation',
  as: 'contrats'
});

Contrat.belongsTo(Vehicule, {
  foreignKey: 'num_immatriculation',
  as: 'vehicule',
  targetKey: 'num_immatriculation'
});

Client.hasMany(Reservation, {
  foreignKey: 'cin_client', // Use 'cin_client' as the foreign key in reservation
  as: 'reservations'
});

Reservation.belongsTo(Client, {
  foreignKey: 'cin_client', // Use 'cin_client' as the foreign key in reservation
  as: 'client',
  targetKey: 'cin_client' // Specify the target key in the Client model
});

Vehicule.hasMany(Reservation, {
  foreignKey: 'num_immatriculation',
  as: 'reservations'
});

Reservation.belongsTo(Vehicule, {
  foreignKey: 'num_immatriculation',
  as: 'vehicule',
  targetKey: 'num_immatriculation'
});
Categorie.hasMany(Vehicule, {
  foreignKey: 'id_categorie',
  as: 'vehicules'
});

Vehicule.belongsTo(Categorie, {
  foreignKey: 'id_categorie',
  as: 'categorie'
});

Contrat.hasMany(Avance, {
    foreignKey: 'Numero_contrat',
    as: 'avances'
});

Avance.belongsTo(Contrat, {
    foreignKey: 'Numero_contrat',
    as: 'contrat',
    targetKey: 'Numero_contrat'
});

Contrat.hasMany(Paiement, {
    foreignKey: 'Numero_contrat',
    as: 'paiements'
});

Paiement.belongsTo(Contrat, {
    foreignKey: 'Numero_contrat',
    as: 'contrat',
    targetKey: 'Numero_contrat'
});

// Association to check if a Reservation is used in a Contrat
Reservation.hasOne(Contrat, {
  foreignKey: 'id_reservation',
  as: 'contratUsingThisReservation'
});

Contrat.belongsTo(Reservation, {
  foreignKey: 'id_reservation',
  as: 'reservationSource'
});


module.exports = { Vehicule, Contrat, Reservation, Client, Categorie, Avance, Paiement };