/* eslint-disable no-else-return */
const db = require("../../database/client");

const insert = (video) => {
  const { title, description, thumbnail } = video;

  return db.query(
    "INSERT INTO videos (title, description, URL_video, type_video, thumbnail, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      description,
      video.URL_video,
      video.type_video,
      thumbnail,
      video.category_id,
      video.user_id,
    ]
  );
};

const findAllVideoInfos = (videoId) => {
  return db.query(
    `
    SELECT 
      v.*,
      u.*,
      c.name,
      (SELECT COUNT(*) FROM likes WHERE video_id = v.video_id) AS like_count,
      (SELECT COUNT(*) FROM views WHERE video_id = v.video_id) AS view_count
    FROM videos v
    LEFT JOIN users u ON v.user_id = u.user_id
    LEFT JOIN likes l ON v.video_id = l.video_id
    LEFT JOIN views vw ON v.video_id = vw.video_id
    JOIN categories AS c ON v.category_id = c.category_id
    WHERE v.video_id = ?
    GROUP BY v.video_id, u.user_id
  `,
    [videoId]
  );
};

const insertVideoTag = (videoId, tagId) => {
  return db.query("INSERT INTO add_tags (video_id, tag_id) VALUES (?, ?)", [
    videoId,
    tagId,
  ]);
};

const findById = (id) => {
  return db.query(
    `SELECT v.*, u.*, c.name, (SELECT COUNT(*) FROM likes WHERE video_id = v.video_id) AS like_count, v.view_count 
    FROM videos v 
    LEFT JOIN users u ON v.user_id = u.user_id 
    LEFT JOIN categories c ON v.category_id = c.category_id 
    WHERE v.video_id = ?`,
    [id]
  );
};

const updateViewCount = (idVideo) => {
  return db.query(
    `UPDATE videos SET view_count = view_count +1 WHERE video_id = ?`,
    [idVideo]
  );
};

const insertViewCount = (idVideo) => {
  return db.query(`INSERT INTO views (video_id, count) VALUES (?, 1)`, [
    idVideo,
  ]);
};

// const addLike = (videoId, userId) => {
//   return db.query(
//     `INSERT INTO likes (video_id, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE video_id = video_id;
//     UPDATE videos SET like_count = like_count + 1 WHERE video_id = ?`,
//     [videoId, userId, videoId]
//   );
// };

// const removeLike = (videoId, userId) => {
//   return db.query(
//     `DELETE FROM likes WHERE video_id = ? AND user_id = ?;
//     UPDATE videos SET like_count = like_count - 1 WHERE video_id = ?`,
//     [videoId, userId, videoId]
//   );
// };

const findAll = () => {
  return db.query("SELECT * FROM videos");
};

const update = (id, title, description, thumbnail, category) => {
  if (thumbnail) {
    return db.query(
      "UPDATE videos SET title = ?, description = ?, thumbnail = ?, category_id = ? WHERE video_id = ?",
      [title, description, thumbnail, category, id]
    );
  } else {
    return db.query(
      "UPDATE videos SET title = ?, description = ?, category_id = ? WHERE video_id = ?",
      [title, description, category, id]
    );
  }
};

const findMostViewed = () => {
  return db.query(`SELECT videos.*, users.*, 
  (SELECT SUM(views.count) FROM views WHERE video_id = videos.video_id) AS view_count 
  FROM videos
  JOIN views ON videos.video_id = views.video_id
  JOIN users ON videos.user_id = users.user_id
  GROUP BY videos.video_id
  ORDER BY view_count DESC
  LIMIT 4;`);
};

const findByCategory = (categoryId) => {
  return db.query(
    "SELECT c.*, u.*, v.* FROM categories AS c JOIN videos AS v ON c.category_id = v.category_id JOIN users AS u ON u.user_id = v.user_id WHERE c.category_id = ?",
    [categoryId]
  );
};

const destroy = (id) => {
  return db.query("DELETE FROM videos WHERE video_id = ?", [id]);
};

const findCommentsInfoByVideo = (videoId) => {
  return db.query(
    `SELECT c.*, u.username, u.avatar
     FROM comments c
     JOIN users u ON c.user_id = u.user_id
     WHERE c.video_id = ?
     ORDER BY c.date_comment DESC`,
    [videoId]
  );
};

const findByVideoNameOrCatOrTag = (videoName, categoryName, tagName) => {
  return db.query(
    "SELECT DISTINCT v.*, u.username, u.avatar, c.name AS category_name FROM videos v JOIN users u ON v.user_id = u.user_id LEFT JOIN categories c ON v.category_id = c.category_id LEFT JOIN add_tags at ON v.video_id = at.video_id LEFT JOIN tags t ON at.tag_id = t.tag_id WHERE v.title LIKE ? OR c.name LIKE ? OR t.name LIKE ?",
    [`%${videoName}%`, `%${categoryName}%`, `%${tagName}%`]
  );
};

const isInUserFavorites = (userId, videoId) => {
  return db.query(
    "SELECT v.video_id, v.title, v.description, v. URL_video, v.type_video, v.thumbnail, v.date_publication, v.validate, v.category_id, v.user_id AS creator_id, f.user_id AS favorite_user_id FROM videos AS v JOIN favorites AS f ON v.video_id = f.video_id WHERE f.user_id = ? AND f.video_id = ?",
    [userId, videoId]
  );
};

const addLike = (videoId, userId) => {
  return db.query(`INSERT INTO likes (video_id, user_id) VALUES (?,?)`, [
    videoId,
    userId,
  ]);
};

const removeLike = (userId, videoId) => {
  return db.query(`DELETE FROM likes WHERE user_id = ? AND video_id = ?`, [
    videoId,
    userId,
  ]);
};

const isInLike = (userId, videoId) => {
  return db.query(
    `SELECT u.*, l.video_id AS liked_video_id FROM users AS u JOIN likes AS l ON u.user_id = l.user_id WHERE l.user_id = ? AND l.video_id = ?`,
    [userId, videoId]
  );
};

module.exports = {
  insert,
  findById,
  findAll,
  insertVideoTag,
  update,
  findMostViewed,
  findByCategory,
  destroy,
  findAllVideoInfos,
  findCommentsInfoByVideo,
  findByVideoNameOrCatOrTag,
  updateViewCount,
  insertViewCount,
  isInUserFavorites,
  isInLike,
  addLike,
  removeLike,
};
