import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.get("/", (req, res) => {
  const jsonData = fs.readFileSync(process.env.DATA, "utf8");
  const videosData = JSON.parse(jsonData);
  let videoList = [];

  videosData.map((video) => {
    const { id, title, channel, image } = video;
    videoList.push({
      id,
      title,
      channel,
      image,
    });
  });

  res.status(200).json(videoList);
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

  const jsonData = fs.readFileSync(process.env.DATA, "utf8");
  let videosData = JSON.parse(jsonData);
  videosData.push(newVideo);
  fs.writeFileSync(process.env.DATA, JSON.stringify(videosData));

  res.status(201).json(newVideo);
});

router.get("/:id", (req, res) => {
  const { id: requestVideoId } = req.params;
  const jsonData = fs.readFileSync(process.env.DATA, "utf8");
  const videosData = JSON.parse(jsonData);

  const video = videosData.find((video) => video.id === requestVideoId);

  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404).json({
      message: `Video with id: ${requestVideoId} was not found.`,
    });
  }
});

export default router;
