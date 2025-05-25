const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Contrat = db.define("Contrat", {
    ID_contrat: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    Numero_contrat: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    Date_debut: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Heure_debut: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    Date_retour: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Heure_retour: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    Duree_location: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Prolongation: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    num_immatriculation: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cin_client: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true
    },
    Prix_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    mode_reglement_garantie: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    montant: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    echeance: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    numero_piece: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    banque: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    frais_retour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    frais_carburant: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    frais_chauffeur: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    prix_jour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    id_reservation: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
            model: "reservation",
            key: "id_reservation"
        }
    },
    login_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "login",
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    solde: { // Nouveau champ
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: "contrat",
    timestamps: false,
    freezeTableName: true
});

module.exports = Contrat;