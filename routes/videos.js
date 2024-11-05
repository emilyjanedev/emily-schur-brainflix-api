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

router.post("/:id/comments", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(404).json({
      message: "Request is missing request body. Could not post comment.",
    });
  }

  const { name, comment } = req.body;
  const { id: videoId } = req.params;

  const newComment = {
    id: uuidv4(),
    name: name,
    comment: comment,
    likes: 0,
    timestamp: Date.now(),
  };

  const jsonData = fs.readFileSync(process.env.DATA, "utf8");
  const videosData = JSON.parse(jsonData);
  const video = videosData.find((video) => video.id === videoId);

  if (!video) {
    res.status(404).json({
      message: "No video with that id exists. Unable to post comment.",
    });
  }

  video.comments.push(newComment);
  fs.writeFileSync(process.env.DATA, JSON.stringify(videosData));
  res.status(201).json(newComment);
});

router.delete("/:videoId/comments/:commentId", (req, res) => {
  const { videoId, commentId } = req.params;

  const jsonData = fs.readFileSync(process.env.DATA, "utf8");
  const videosData = JSON.parse(jsonData);

  const video = videosData.find((video) => video.id === videoId);

  if (!video) {
    res.status(404).json({
      message: "No video with that id exists. Unable to delete comment",
    });
  }

  const commentIndex = video.comments.findIndex(
    (comment) => comment.id === commentId
  );

  if (commentIndex === -1) {
    res.status(404).json({
      message: "No comment with that id exists. Could not delete comment.",
    });
  }

  const removedComment = video.comments.splice(commentIndex, 1);
  fs.writeFileSync(process.env.DATA, JSON.stringify(videosData));
  res.status(200).json(removedComment);
});

export default router;
