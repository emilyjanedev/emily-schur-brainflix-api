import express from "express";
import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../utils/dataUtils.js";

const router = express.Router({ mergeParams: true });

router.post("/", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(204).json({
      message: "Request is missing request body. Could not post comment.",
    });
  }

  const { name, comment } = req.body;
  const { id: videoId } = req.params;

  const newComment = {
    id: uuidv4(),
    name,
    comment,
    likes: 0,
    timestamp: Date.now(),
  };

  const videosData = readData("DATA");
  const video = videosData.find((video) => video.id === videoId);

  if (!video) {
    res.status(404).json({
      message: "No video with that id exists. Unable to post comment.",
    });
  }

  video.comments.push(newComment);
  writeData(videosData, "DATA");
  res.status(201).json(newComment);
});

router.delete("/:commentId", (req, res) => {
  const { id: videoId, commentId } = req.params;

  const videosData = readData("DATA");
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
  writeData(videosData, "DATA");
  res.status(200).json(removedComment);
});

router.put("/:commentId", (req, res) => {
  const { id: videoId, commentId } = req.params;

  const videosData = readData("DATA");
  const video = videosData.find((video) => video.id === videoId);

  if (!video) {
    res.status(404).json({
      message: "No video with that id exists. Unable to like comment",
    });
  }

  const likedComment = video.comments.find(
    (comment) => comment.id === commentId
  );

  if (!likedComment) {
    res.status(404).json({
      message: "No comment with that id exists. Could not like comment.",
    });
  }

  likedComment.likes += 1;
  writeData(videosData, "DATA");

  res.status(201).json(likedComment);
});

export default router;
