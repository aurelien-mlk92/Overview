const db = require("../../database/client");

const findFollowedById = (id) => {
  return db.query("SELECT * FROM subscribe WHERE followed_id = ?", [id]);
};

module.exports = { findFollowedById };
