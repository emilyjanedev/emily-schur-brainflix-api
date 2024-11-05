import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Get list of videos with id, title, channel, image");
});

router.post("/", (req, res) => {
  const { title, description } = req.body;

  const newVideo = {
    id: uuidv4(),
    title: title,
    channel: "Emily Jane",
    image:
      "https://unit-3-project-api-0a5620414506.herokuapp.com/images/image0.jpg",
    description: description,
    views: 123456,
    likes: 0,
    duration: "4:01",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };

  const jsonData = fs.readFileSync("./data/videos.json", "utf8");
  let videosData = JSON.parse(jsonData);
  videosData.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
  console.log(videosData);

  res.status(201).json(newVideo);
});

router.get("/:id", (req, res) => {
  const videoId = req.params;
  res
    .status(200)
    .send(
      `Get video details for video with id of ${videoId}: entire video object`
    );
});

export default router;
