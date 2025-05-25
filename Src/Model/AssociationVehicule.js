const Vehicule = require("./VehiculesModel");
const Contrat = require("./ContratModel");
const Reservation = require("./ReservationModel");

Client.hasMany(Contrat, {
  foreignKey: 'num_immatriculation', // Use 'cin_client' as the foreign key in contrat
  as: 'contrats'
});

Contrat.belongsTo(Client, {
  foreignKey: 'num_immatriculation', // Use 'cin_client' as the foreign key in contrat
  as: 'vehicule',
  targetKey: 'num_immatriculation' // Specify the target key in the Client model
});

Client.hasMany(Reservation, {
  foreignKey: 'num_immatriculation', // Use 'cin_client' as the foreign key in reservation
  as: 'reservations'
});

Reservation.belongsTo(Client, {
  foreignKey: 'num_immatriculation', // Use 'cin_client' as the foreign key in reservation
  as: 'vehicule',
  targetKey: 'num_immatriculation' // Specify the target key in the Client model
});

module.exports = { vehicule, Contrat, Reservation };