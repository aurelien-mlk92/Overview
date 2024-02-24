const db = require("../../database/client");

const insertComment = (com) => {
  const { comment } = com;
  return db.query(
    "INSERT INTO comments (comment, user_id, video_id) VALUES (?,?,?)",
    [comment, com.userId, com.video_id]
  );
};

const findById = (id) => {
  return db.query(
    `
    SELECT comments.*, users.avatar 
    FROM comments 
    JOIN users ON comments.user_id = users.user_id 
    WHERE comments.comment_id = ?`,
    [id]
  );
};

const changeComment = (commentId, newCommentText) => {
  return db.query("UPDATE comments SET comment = ? WHERE comment_id = ?", [
    newCommentText,
    commentId,
  ]);
};

const deleteComment = (commentId) => {
  return db.query("DELETE FROM comments WHERE comment_id = ?", [commentId]);
};

module.exports = {
  insertComment,
  findById,
  changeComment,
  deleteComment,
};
