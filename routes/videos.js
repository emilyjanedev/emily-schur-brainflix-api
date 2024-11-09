import express from "express";
import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../utils/dataUtils.js";
import multer from "multer";
import path from "path";
import commentRoutes from "./comments.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./public/images");
  },
  filename: (_req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    cb(null, `${basename}${extname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", (_req, res) => {
  const videosData = readData();
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

router.post("/", upload.single("fileData"), (req, res) => {
  const { title, description } = req.body;
  const fileData = req.file;

  const newVideo = {
    id: uuidv4(),
    title,
    channel: "Emily Jane",
    image: fileData
      ? `http://localhost:8080/images/${fileData.filename}`
      : "http://localhost:8080/images/image0.jpg",
    description,
    views: "123,456",
    likes: "0",
    duration: "4:01",
    video: "http://localhost:8080/videos/stream.mp4",
    timestamp: Date.now(),
    comments: [],
  };

  let videosData = readData();
  videosData.push(newVideo);
  writeData(videosData);

  res.status(201).json(newVideo);
});

router.get("/:id", (req, res) => {
  const { id: requestVideoId } = req.params;
  const videosData = readData();

  const video = videosData.find((video) => video.id === requestVideoId);

  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404).json({
      message: `Video with id: ${requestVideoId} was not found.`,
    });
  }
});

router.put("/:id/likes", (req, res) => {
  const { id } = req.params;

  const videosData = readData();
  const likedVideo = videosData.find((video) => video.id === id);

  if (!likedVideo) {
    res
      .status(404)
      .json({ message: "No video with that id exists. Could not like video." });
  }

  let likesNumber = parseInt(likedVideo.likes.split(",").join(""), 10);
  likesNumber += 1;
  likedVideo.likes = likesNumber.toLocaleString();
  writeData(videosData);
  res.status(201).json(likedVideo);
});

router.use("/:id/comments", commentRoutes);

export default router;
