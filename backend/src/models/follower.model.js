const db = require("../../database/client");

const findFollowerById = (id) => {
  return db.query("SELECT * FROM subscribe WHERE follower_id = ?", [id]);
};

const findFollowersWithUser = (userId) => {
  return db.query(
    `
  SELECT users.*, subscribe.follower_id, subscribe.followed_id
  FROM users
  JOIN subscribe ON users.id = subscribe.follower_id OR users.id = subscribe.followed_id
  WHERE users.id = ?
`,
    [userId]
  );
};

module.exports = {
  findFollowerById,
  findFollowersWithUser,
};
