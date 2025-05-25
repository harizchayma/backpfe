const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Vehicules = db.define("Vehicules", {
    id_vehicule: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    num_immatriculation: { 
        type: DataTypes.STRING(20), 
        allowNull: false,
        unique: true 
    },
    n_serie_du_type: { type: DataTypes.STRING(30), allowNull: false },
    marque: { type: DataTypes.STRING(30), allowNull: false },
    modele: { type: DataTypes.STRING(30), allowNull: false },
    type_commercial: { type: DataTypes.STRING(30), allowNull: false },
    carrosserie: { type: DataTypes.INTEGER, allowNull: false },
    energie: { type: DataTypes.STRING(20), allowNull: false },
    puissance_fiscale: { type: DataTypes.INTEGER, allowNull: false },
    nbr_places: { type: DataTypes.INTEGER, allowNull: false },
    cylindree: { type: DataTypes.INTEGER, allowNull: false },
    num_certificat: { type: DataTypes.STRING(30), allowNull: false },
    lieu_certificat: { type: DataTypes.STRING(30), allowNull: false },
    date_certificat: { type: DataTypes.DATEONLY, allowNull: false }, 
    prix_jour: { 
        type: DataTypes.FLOAT, 
        allowNull: false, 
        validate: {
            min: 0 
        }
    },
    id_categorie: { 
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    image: { type: DataTypes.BLOB('long'), allowNull: true },
}, {
    tableName: "vehicules",
    timestamps: false
});

module.exports = Vehicules;