import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
  res.send("Brainflix API");
});

app.listen(PORT, () => {
  console.log("Server is listening on:", PORT);
});
