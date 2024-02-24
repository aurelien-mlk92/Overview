const tagModel = require("../models/tag.model");

const getAll = async (req, res, next) => {
  try {
    const [tag] = await tagModel.findAll();
    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

const getAllByVideoId = async (req, res, next) => {
  try {
    const [tags] = await tagModel.findByVideoId(req.params.id);
    if (tags) res.status(200).json(tags);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getAllByVideoId };
