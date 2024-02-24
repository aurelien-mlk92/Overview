const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import routes here
const itemRouter = require("./routes/items.route");
const userRouter = require("./routes/user.route");
const videoRouter = require("./routes/video.route");
const categoryRouter = require("./routes/category.route");
const tagRouter = require("./routes/tag.route");
const followedRouter = require("./routes/user.route");
const followerRouter = require("./routes/user.route");
const commentRouter = require("./routes/comment.route");

// Apply routes
router.use(itemRouter);
router.use(userRouter);
router.use(videoRouter);
router.use(categoryRouter);
router.use(tagRouter);
router.use(followedRouter);
router.use(followerRouter);
router.use(commentRouter);

/* ************************************************************************* */

module.exports = router;
