const commentModel = require("../models/comment.model");

const postComment = async (req, res, next) => {
  try {
    const com = req.body;
    com.userId = req.user_id;
    const [result] = await commentModel.insertComment(req.body);
    if (result.insertId) {
      const [[comment]] = await commentModel.findById(result.insertId);
      res.status(201).json(comment);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const [[comment]] = await commentModel.findById(req.params.id);
    if (comment) res.status(200).json(comment);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const [result] = await commentModel.changeComment(
      req.params.id,
      req.body.comment
    );
    if (result.affectedRows > 0) {
      res.status(204);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    next(error);
  }
};

const removeComment = async (req, res, next) => {
  try {
    const [result] = await commentModel.deleteComment(req.params.id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { postComment, getCommentById, updateComment, removeComment };
