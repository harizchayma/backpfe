const { DataTypes, Model } = require("sequelize");
const db = require("../conx/db");

const User = Model.init(
    {
        login: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(255), allowNull: false },
        role: { type: DataTypes.STRING(30), allowNull: false },
        image: { type: DataTypes.BLOB('long'), allowNull: true },
        cin_utilisateur: { type: DataTypes.STRING(8), allowNull: true }, // Added
        tel: { type: DataTypes.STRING(8), allowNull: true }, // Added
        mail: { type: DataTypes.STRING(255), allowNull: true }, // Added
        nom: { type: DataTypes.STRING(255), allowNull: true }, // Added
        prenom: { type: DataTypes.STRING(255), allowNull: true }, // Added
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true // true for "1" (active) and false for "0" (inactive)
        }
        
    },
    {
        sequelize: db,
        modelName: "User", // Corrected model name
        tableName: "login",
        timestamps: false
    }
);

module.exports = User;