/* eslint-disable no-await-in-loop */
const videoModel = require("../models/video.model");
const tagModel = require("../models/tag.model");

const add = async (req, res, next) => {
  try {
    const video = req.body;
    video.URL_video = `${req.protocol}://${req.get("host")}/upload/${
      req.files[0].filename
    }`;
    video.thumbnail = `${req.protocol}://${req.get("host")}/upload/${
      req.files[1].filename
    }`;
    video.user_id = req.user_id;

    const [result] = await videoModel.insert(video);
    if (result.insertId) {
      const tabTagId = video.tags.split(",").map(Number);
      const addTags = [];
      for (let i = 0; i < tabTagId.length; i += 1) {
        const idTag = tabTagId[i];
        await tagModel.insertTagVideo(result.insertId, idTag);
        const [[getTag]] = await tagModel.findById(idTag);
        addTags.push(getTag);
      }
      res.status(201).json({ videoAdd: video, tags: addTags });
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const [videos] = await videoModel.findAll();
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const [[video]] = await videoModel.findById(req.params.id);
    if (video) res.status(200).json(video);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const thumbnail = `${req.protocol}://${req.get("host")}/upload/${
      req.files[0]?.filename
    }`;
    const [updatedVideo] = await videoModel.update(
      id,
      req.body.title,
      req.body.description,
      thumbnail,
      req.body.category_id
    );

    await tagModel.removeTagByVideo(req.params.id);

    if (data.tags.trim() !== "undefined") {
      const tabNewTagId = data.tags.split(",");
      for (let i = 0; i < tabNewTagId.length; i += 1) {
        const idNewTag = tabNewTagId[i];
        await tagModel.findById(idNewTag);
        await videoModel.insertVideoTag(req.params.id, idNewTag);
      }
    }
    if (updatedVideo.affectedRows > 0) {
      const updateVideo = await videoModel.findById(id);
      res.status(200).json(updateVideo);
    } else res.status(404).send("video not found");
  } catch (error) {
    next(error);
  }
};

const getMostViewed = async (req, res) => {
  try {
    const [mostViewedVideos] = await videoModel.findMostViewed();
    res.json(mostViewedVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllVideosByCatId = async (req, res, next) => {
  try {
    const [videos] = await videoModel.findByCategory(req.params.categoryId);
    if (videos) res.status(200).json(videos);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const [result] = await videoModel.destroy(req.params.id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const getAllVideoInfos = async (req, res, next) => {
  try {
    const [video] = await videoModel.findAllVideoInfos(req.params.id);
    if (video.length > 0) {
      res.status(200).json(video);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const getAllCommentsbyVideo = async (req, res, next) => {
  try {
    const [comments] = await videoModel.findCommentsInfoByVideo(req.params.id);
    if (comments) {
      res.status(200).json(comments);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};
const getSearchResults = async (req, res, next) => {
  try {
    const { videoTitle, catName, tagName } = req.query;
    const [videos] = await videoModel.findByVideoNameOrCatOrTag(
      videoTitle,
      catName,
      tagName
    );
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const changeViewCount = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    await videoModel.updateViewCount(videoId);
    const [[updatedVideo]] = await videoModel.findById(videoId);
    if (updatedVideo) {
      res.json({ success: true, viewCount: updatedVideo.view_count });
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    next(error);
  }
};

const likeVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const userId = req.user_id;
    const [result] = await videoModel.addLike(videoId, userId);
    if (result.affectedRows > 0)
      res.status(200).json({ message: "Video liked successfully." });
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const unlikeVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const userId = req.user_id;
    const [result] = await videoModel.removeLike(videoId, userId);
    if (result.affectedRows > 0)
      res.status(200).json({ message: "Video unliked successfully." });
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const checkVideoInUserFavoriteList = async (req, res, next) => {
  try {
    const [[result]] = await videoModel.isInUserFavorites(
      req.user_id,
      req.params.id
    );
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const checkLikedVideoForUser = async (req, res, next) => {
  try {
    const [[result]] = await videoModel.isInLike(req.user_id, req.params.id);
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  getAll,
  getOne,
  edit,
  getMostViewed,
  getAllVideosByCatId,
  removeOne,
  getAllVideoInfos,
  getAllCommentsbyVideo,
  getSearchResults,
  changeViewCount,
  likeVideo,
  unlikeVideo,
  checkVideoInUserFavoriteList,
  checkLikedVideoForUser,
};
