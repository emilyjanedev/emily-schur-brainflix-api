import express from "express";
import "dotenv/config";
import cors from "cors";
import videoRoutes from "./routes/videos.js";
import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "./utils/dataUtils.js";
import basicAuthQuery from "./utils/basicAuthQuery.js";

const app = express();
const PORT = process.env.PORT || 8081;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors(CORS_ORIGIN));
app.use(express.json());
app.use(express.static("public"));

app.use("/videos", basicAuthQuery, videoRoutes);

app.get("/", (_req, res) => {
  res.status(200).send("Brainflix API");
});

app.get("/register", (_req, res) => {
  const newKey = { key: uuidv4() };
  let keys = readData("KEYS");
  keys.push(newKey);
  writeData(keys, "KEYS");

  res.status(201).json({ apiKey: `${newKey.key}` });
});

app.listen(PORT, () => {
  console.log("Server is listening on:", PORT);
});
