const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Avance = db.define("Avance", {
    id_avance: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cin_client: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Numero_contrat: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
            model: 'contrat',
            key: 'Numero_contrat'
        }
    },
    Numero_avance: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
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
    montant_avance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Peut être nul
    },
}, {
    tableName: "avance",
    timestamps: false,
    freezeTableName: true
});

module.exports = Avance;