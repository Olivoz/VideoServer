import express from "express";
import { ObjectId } from "mongodb";
import { videos } from "../controller/database.controller.js";

const router = express.Router();

const errorNoVideo = {
  message: "Video not found",
};

router.get("/", (req, res) => {
  const list = [];
  videos
    .find()
    .forEach((doc) => {
      doc.id = doc._id;
      delete doc._id;
      list.push(doc);
    })
    .then(() => {
      res.json({ videos: list });
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  if (!body?.url) {
    res.status(400).json({
      message: "Missing video url",
    });
    return;
  }

  videos
    .insertOne({ url: body.url })
    .then((result) => {
      res.status(201).json({ id: result.insertedId });
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

router.get("/:id", (req, res) => {
  let id;
  try {
    id = ObjectId.createFromHexString(req.params.id);
  } catch {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  videos
    .findOne({ _id: id })
    .then((result) => {
      if (!result) {
        res.status(404).json(errorNoVideo);
        return;
      }

      result.id = result._id;
      delete result._id;

      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

router.delete("/:id", (req, res) => {
  let id;
  try {
    id = ObjectId.createFromHexString(req.params.id);
  } catch {
    res.status(404).json(errorNoVideo);
    return;
  }

  videos
    .deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount != 1) {
        res.status(404).json(errorNoVideo);
        return;
      }

      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

export default router;
