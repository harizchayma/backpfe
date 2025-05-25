const { Sequelize } = require("sequelize");

const db = new Sequelize("location", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

const Connectiondb = async () => {
    try {
        await db.authenticate();
        console.log("✅ Connexion réussie à la base de données !");
    } catch (err) {
        console.error("❌ Erreur de connexion :", err.message);
        process.exit(1);
    }
};

Connectiondb();

module.exports = db;
