const router = require("express").Router();

const videoController = require("../controllers/video.controller");
const tagController = require("../controllers/tag.controller");
const fileUpload = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");

router.post("/videos", auth.isAuth, fileUpload.any(), videoController.add);
router.get("/videos", videoController.getAll);
router.get("/videos/most-viewed", videoController.getMostViewed);
router.get("/videos/category/:categoryId", videoController.getAllVideosByCatId);
router.get("/videos/search", videoController.getSearchResults);
router.get("/videos/:id", videoController.getOne);
router.get(
  "/videos/:id/isFavorite",
  auth.isAuth,
  videoController.checkVideoInUserFavoriteList
);
router.get(
  "/videos/:id/isLiked",
  auth.isAuth,
  videoController.checkLikedVideoForUser
);
router.get("/videos/:id/comments", videoController.getAllCommentsbyVideo);
router.get("/videos/:id/tags", tagController.getAllByVideoId);
router.put("/videos/:id/viewsUpdate", videoController.changeViewCount);
router.put("/videos/:id", fileUpload.any(), videoController.edit);
router.post("/videos/:id/like", auth.isAuth, videoController.likeVideo);
router.delete("/videos/:id/unlike", auth.isAuth, videoController.unlikeVideo);
router.delete("/videos/:id", videoController.removeOne);

module.exports = router;
