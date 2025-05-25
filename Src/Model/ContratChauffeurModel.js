// Model/ContratChauffeurModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../conx/db"); // Chemin vers votre instance sequelize

const ContratChauffeur = sequelize.define(
  "ContratChauffeur",
  {
    idContratChauffeur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "idContratChauffeur",
    },
    Numero_contrat: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "contrat",
        key: "Numero_contrat",
      },
    },
    id_chauffeur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "chauffeur",
        key: "id_chauffeur",
      },
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "client",
        key: "id_client",
      },
    },
  },
  {
    tableName: "contratchauffeur",
    timestamps: false,
  }
);

module.exports = ContratChauffeur;