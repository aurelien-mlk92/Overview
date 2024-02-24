const db = require("../../database/client");

const insert = (user) => {
  const { mail, password, username } = user;

  return db.query(
    "INSERT INTO users (mail, password, username) VALUES (?, ?, ?)",
    [mail, password, username]
  );
};

const findById = (id) => {
  return db.query("SELECT * FROM users WHERE user_id = ?", [id]);
};

const findByUsername = (username) => {
  return db.query("SELECT * FROM users WHERE username = ?", [username]);
};

const findAll = () => {
  return db.query("SELECT * FROM users");
};

const getVideosByUserId = (userId) => {
  return db.query(
    "SELECT v.*, u.username, u.avatar, SUM(vw.count) AS view_count FROM videos AS v JOIN users AS u ON v.user_id = u.user_id LEFT JOIN views AS vw ON vw.video_id = v.video_id WHERE u.user_id = ? GROUP BY v.video_id;",
    [userId]
  );
};

const editUserByUserId = (newUserInfo, userId) => {
  const fieldsToUpdate = Object.keys(newUserInfo);
  const updateValues = fieldsToUpdate.map((field) => `${field} = ?`).join(", ");
  const query = `UPDATE users SET ${updateValues} WHERE user_id = ?`;
  const values = [...fieldsToUpdate.map((field) => newUserInfo[field]), userId];
  return db.query(query, values);
};

const destroyByUserId = (userId) => {
  return db.query("DELETE FROM users where user_id = ?", [userId]);
};

const updateUser = async (userId, newData) => {
  const { mail, username, password } = newData;
  const result = await db.query(
    "UPDATE Users SET (mail, username, password) WHERE user_id = ?, ?, ?, ?",
    [mail, username, password, userId]
  );
  return result.rows[0];
};

const deleteUser = async (userId) => {
  try {
    await db.query("DELETE FROM Users WHERE user_id = ?", [userId]);
    return { success: true, message: "Utilisateur supprimé avec succès" };
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'utilisateur :",
      error.message
    );
    throw error;
  }
};

const followUserId = (userId, followedId) => {
  return db.query(
    "INSERT INTO subscribe (follower_id, followed_id) VALUES (?,?)",
    [userId, followedId]
  );
};

const unfollowUserId = (userId, unfollowedId) => {
  return db.query(
    "DELETE FROM subscribe WHERE follower_id = ? AND followed_id = ?",
    [userId, unfollowedId]
  );
};

const isFollowedByUser = (userId, followedId) => {
  return db.query(
    "SELECT * FROM users AS u JOIN subscribe AS s ON s.follower_id = u.user_id WHERE s.follower_id = ? AND s.followed_id = ?",
    [userId, followedId]
  );
};

const getFollowerList = (userId) => {
  return db.query(
    "SELECT u.*, s.* FROM users AS u JOIN subscribe AS s ON s.follower_id = u.user_id WHERE s.followed_id = ? ",
    [userId]
  );
};

const getFollowedList = (userId) => {
  return db.query(
    "SELECT u.*, s.* FROM users AS u JOIN subscribe AS s ON s.followed_id = u.user_id WHERE s.follower_id = ? ",
    [userId]
  );
};

const getFavoriteVideosPerUserByVideoType = (userId, videoType) => {
  return db.query(
    "SELECT v.video_id, v.title, v.description, v. URL_video, v.type_video, v.thumbnail, v.date_publication, v.validate, v.category_id, SUM(vw.count) AS view_count, v.user_id AS creator_id, u.username AS creator_username, u.avatar AS creator_avatar, f.user_id AS favorite_user_id FROM users AS u JOIN videos AS v ON u.user_id = v.user_id LEFT JOIN views AS vw ON vw.video_id = v.video_id LEFT JOIN favorites AS f ON v.video_id = f.video_id WHERE f.user_id = ? AND v.type_video = ? GROUP BY v.video_id",
    [userId, videoType]
  );
};

const addVideoToFavorites = (userId, videoId) => {
  return db.query("INSERT INTO favorites (user_id, video_id) VALUES (?,?)", [
    userId,
    videoId,
  ]);
};

const removeVideoFromFavorites = (userId, videoId) => {
  return db.query("DELETE FROM favorites WHERE user_id = ? AND video_id = ?", [
    userId,
    videoId,
  ]);
};

module.exports = {
  insert,
  findById,
  findByUsername,
  getVideosByUserId,
  findAll,
  editUserByUserId,
  destroyByUserId,
  updateUser,
  deleteUser,
  followUserId,
  unfollowUserId,
  isFollowedByUser,
  getFollowerList,
  getFollowedList,
  getFavoriteVideosPerUserByVideoType,
  addVideoToFavorites,
  removeVideoFromFavorites,
};
