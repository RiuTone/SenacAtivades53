import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet({contentSecurityPolicy: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public/')))

const limitAuth = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: {erro: "muitas tentativas! aguarde 15 minutos..."}
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get("/dashbord", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard/index.html"))
});
