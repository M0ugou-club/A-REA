import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./src/router.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swaggerConfig.js";
import mongo from "./utils/mongo.js";
import cron from "node-cron";
import { actionsTriggers } from "./src/utils/areasService/areasTriggers.js";
import https from "https";
import fs from "fs";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// Parsing du body en JSON
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

// Intégration de swagger

// Route Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Pour toutes les routes nous renvoyons au router
app.use("/", router);

await mongo();

async function cronJob() {
  cron.schedule("* * * * *", async () => {
    await actionsTriggers();
  });
}

cronJob();

// Lire les fichiers de certificat
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Création du serveur HTTPS
https.createServer(credentials, app).listen(port, () => {
  console.log(`BACKEND lancé sur le port ${port} en HTTPS`);
});