const express = require("express");
const cors = require("cors");
const vehiculesRoute = require('./Src/Routes/Vehicules');
const userRoutes = require("./Src/Routes/UserRoute");
const CategorieRoutes = require("./Src/Routes/CatégorieRoute"); 
const clientRoutes = require ("./Src/Routes/ClientRoute")
const contratRoutes = require ("./Src/Routes/ContratRoute");
const AvanceRoutes =require ("./Src/Routes/AvanceRoute");
const ChauffeurRoutes = require ("./Src/Routes/ChauffeurRoute")
const ContratChauffeurRoutes = require ("./Src/Routes/ContratChauffeurRoute")
const ReservationRoutes = require ("./Src/Routes/ReservationRoute")
const PaiementRoutes  = require ("./Src/Routes/PaiementRoute")
const { logRequest } = require("./Src/Middleware/LogRequest");
const errorHandler = require('./Src/Middleware/ErrorHandler');
const db = require("./Src/conx/db");
require('dotenv').config();

const app = express();

// Middleware
app.use(logRequest);
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));
app.use(express.json());

// Routes
app.use("/vehicules", vehiculesRoute);
app.use("/users", userRoutes);
app.use("/categorie", CategorieRoutes); 
app.use("/client",clientRoutes)
app.use("/contrat",contratRoutes)
app.use("/avance",AvanceRoutes)
app.use("/chauffeur",ChauffeurRoutes)
app.use("/reservation",ReservationRoutes)
app.use("/paiement",PaiementRoutes)
app.use("/ContratChauffeur",ContratChauffeurRoutes)

// Error handler
app.use(errorHandler);

// Connexion à la base de données
db.authenticate()
    .then(() => {
        console.log("✅ Connexion réussie à la base de données !");
        // Démarrer le serveur après la connexion à la base de données
        app.listen(7001,  () => {
            console.log("🚀 Server running on port 7001");
        });
    })
    .catch(err => {
        console.error("❌ Erreur de connexion :", err.message);
        process.exit(1);
    });