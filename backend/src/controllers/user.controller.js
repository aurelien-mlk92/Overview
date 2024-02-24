const argon = require("argon2");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const add = async (req, res, next) => {
  try {
    const user = req.body;
    const [result] = await userModel.insert(user);

    if (result.insertId) {
      const [[newUser]] = await userModel.findById(result.insertId);
      res.status(201).json(newUser);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [[user]] = await userModel.findByUsername(username);
    if (!user) res.sendStatus(422);
    else if (await argon.verify(user.password, password)) {
      const token = jwt.sign(
        { id: user.user_id, admin: user.Admin },
        process.env.APP_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res.cookie("auth-token", token, {
        expire: "30d",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
      res.status(200).json(user);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const [users] = await userModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const [[user]] = await userModel.findById(req.user_id);
    if (user) res.status(200).json(user);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const [[user]] = await userModel.findById(req.params.id);
    if (user) res.status(200).json(user);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const getUsername = async (req, res, next) => {
  try {
    const [[user]] = await userModel.findByUsername(req.params.id);
    if (user) res.status(200).json(user);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const logOut = (req, res, next) => {
  try {
    res.clearCookie("auth-token").sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const getAllVideos = async (req, res, next) => {
  try {
    const [videos] = await userModel.getVideosByUserId(req.params.id);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req, res, next) => {
  try {
    let newUserInfo = req.body;
    if (req.file) {
      const avatarFilename = `${req.protocol}://${req.get("host")}/upload/${
        req.file.filename
      }`;
      newUserInfo = { ...req.body, avatar: avatarFilename };
    }

    const [updatedUser] = await userModel.editUserByUserId(
      newUserInfo,
      req.params.id
    );
    if (updatedUser.affectedRows > 0) {
      const [[user]] = await userModel.findById(req.params.id);
      if (user) res.status(200).json(user);
      else res.sendStatus(404);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const [result] = await userModel.destroyByUserId(req.params.id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const [result] = await userModel.followUserId(req.user_id, req.params.id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    const [result] = await userModel.unfollowUserId(
      req.body.follower_id,
      req.body.followed_id
    );
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const checkFollowUser = async (req, res, next) => {
  try {
    const [[result]] = await userModel.isFollowedByUser(
      req.user_id,
      req.params.id
    );
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const getFollowerListById = async (req, res, next) => {
  try {
    const [result] = await userModel.getFollowerList(req.user_id);
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const getFollowingListById = async (req, res, next) => {
  try {
    const [result] = await userModel.getFollowedList(req.user_id);
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const getFavoriteVideosByUserId = async (req, res, next) => {
  try {
    const [result] = await userModel.getFavoriteVideosPerUserByVideoType(
      req.user_id,
      req.query.type_video
    );
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const addVideoToFavoritesByUserId = async (req, res, next) => {
  try {
    const [result] = await userModel.addVideoToFavorites(
      req.user_id,
      req.body.video_id
    );
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const removeVideoToFavoritesByUserId = async (req, res, next) => {
  try {
    const [result] = await userModel.removeVideoFromFavorites(
      req.user_id,
      req.body.video_id
    );
    if (result) res.status(200).json(result);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  login,
  getAll,
  getCurrentUser,
  getOne,
  logOut,
  getAllVideos,
  updateOne,
  removeOne,
  getUsername,
  followUser,
  unfollowUser,
  checkFollowUser,
  getFollowingListById,
  getFollowerListById,
  getFavoriteVideosByUserId,
  addVideoToFavoritesByUserId,
  removeVideoToFavoritesByUserId,
};
