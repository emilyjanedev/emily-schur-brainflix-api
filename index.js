import express from "express";
import "dotenv/config";
import cors from "cors";
import videoRoutes from "./routes/videos.js";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/videos", videoRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Brainflix API");
});

app.listen(PORT, () => {
  console.log("Server is listening on:", PORT);
});
