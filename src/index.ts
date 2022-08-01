import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { authenticateToken } from "./controller/userController";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure all apis

// users api
app.get("/api/users", authenticateToken, (req, res) => {
  res.send("verified");
});

app.listen(port, () => console.log(`Listening on ${port}`));
