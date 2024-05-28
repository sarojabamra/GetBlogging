import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL =
  process.env.MONGODB_URI ||
  `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.aiz8lkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

Connection(URL);
