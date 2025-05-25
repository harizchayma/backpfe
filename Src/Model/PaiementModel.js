const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Paiement = db.define("Paiement", {
    Id_paiement: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Numero_paiement: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    cin_client: {
        type: DataTypes.STRING(8),
        allowNull: false,
        references: {
            model: 'client', // Référence à la table client
            key: 'cin_client' // Clé étrangère
        }
    },
    Numero_contrat: {
        type: DataTypes.STRING(255), // Defined as a STRING
        allowNull: false,
        references: {
            model: 'contrat', // Référence à la table contrat
            key: 'Numero_contrat' // Clé étrangère
        }
    },
    date_paiement: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    montant_cheque1: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Peut être nul si le paiement n'est pas fait par chèque
    },
    banque_cheque1: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    echeance_cheque1: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    date_cheque1: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    montant_cheque2: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    banque_cheque2: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    echeance_cheque2: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    date_cheque2: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    montant_espace: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    montant_virement: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    banque_virement: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    montant_paiement: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Peut être nul
    },
}, {
    tableName: "paiement", // Nom de la table dans la base de données
    timestamps: false, // Désactive les colonnes createdAt et updatedAt
    freezeTableName: true // Empêche Sequelize de modifier le nom de la table
});

module.exports = Paiement;
