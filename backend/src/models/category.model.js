const db = require("../../database/client");

const insert = (category) => {
  const { name } = category;

  return db.query("INSERT INTO categories (name) VALUES (?)", [name]);
};

const findByVideoId = (id) => {
  return db.query("SELECT * FROM categories WHERE video_id = ?", [id]);
};

const findAll = () => {
  return db.query("SELECT * FROM categories");
};

const findNameById = (id) => {
  return db.query(
    "SELECT c.*, u.*, v.* FROM categories AS c JOIN videos AS v ON c.category_id = v.category_id JOIN users AS u ON u.user_id = v.user_id WHERE c.category_id = ?",
    [id]
  );
};

module.exports = {
  insert,
  findByVideoId,
  findAll,
  findNameById,
};
