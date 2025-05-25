const db = require('../conx/db'); // Assurez-vous que le chemin est correct
const { DataTypes } = require('sequelize');

const Categorie = db.define('Categorie', {
    id_categorie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    catégorie: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'categorie' // Assurez-vous que le nom de la colonne est correct
    }
}, {
    tableName: 'categorie',
    timestamps: false
});

module.exports = Categorie;
