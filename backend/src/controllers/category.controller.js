const categoryModel = require("../models/category.model");

const getAll = async (req, res, next) => {
  try {
    const [category] = await categoryModel.findAll();
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const [[category]] = await categoryModel.findNameById(req.params.id);
    if (category) res.status(200).json(category);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getOne };
