const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Chauffeur = db.define("Chauffeur", {
    id_chauffeur: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nom_fr: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    nom_ar: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    prenom_fr: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    prenom_ar: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    cin_chauffeur: { 
        type: DataTypes.STRING(8), 
        allowNull: false, 
        unique: true 
    },
    date_cin_chauffeur: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    date_naiss: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    adresse_fr: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    adresse_ar: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    num_tel: { 
        type: DataTypes.STRING(20), 
        allowNull: false 
    },
    numero_permis: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    date_permis: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    profession_fr: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
    },
    profession_ar: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
    },
    nationalite_origine: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
  
    
}, {
    tableName: "chauffeur",
    timestamps: false
});

module.exports = Chauffeur;