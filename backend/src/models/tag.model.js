const db = require("../../database/client");

const insert = (tag) => {
  const { name } = tag;

  return db.query("INSERT INTO tags (name) VALUES (?)", [name]);
};

const insertTagVideo = (idvideo, idtag) => {
  return db.query("INSERT INTO add_tags (video_id, tag_id) VALUES (?, ?)", [
    idvideo,
    idtag,
  ]);
};

const findByVideoId = (id) => {
  return db.query(
    "SELECT t.tag_id, t.name AS tag_name FROM tags AS t JOIN add_tags AS a ON t.tag_id = a.tag_id JOIN videos AS v ON a.video_id = v.video_id WHERE v.video_id = ?",
    [id]
  );
};

const findById = (id) => {
  return db.query("SELECT * FROM tags WHERE tag_id = ?", [id]);
};

const findAll = () => {
  return db.query("SELECT * FROM tags");
};

const update = (tagId, videoId) => {
  return db.query("UPDATE add_tags SET tag_id = ? WHERE video_id = ?", [
    tagId,
    videoId,
  ]);
};

const removeTagByVideo = (videoId) => {
  return db.query("DELETE from add_tags WHERE video_id= ?", [videoId]);
};

module.exports = {
  insert,
  findByVideoId,
  findAll,
  findById,
  insertTagVideo,
  update,
  removeTagByVideo,
};
