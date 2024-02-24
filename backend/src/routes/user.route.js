const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const fileUpload = require("../middlewares/fileUpload");

router.post("/users", auth.hashPassword, userController.add);
router.post("/users/login", userController.login);
router.get("/users", auth.isAuth, auth.isAdmin, userController.getAll);
router.get(
  "/users/username",
  auth.isAuth,
  auth.isAdmin,
  userController.getUsername
);
router.get("/users/me", auth.isAuth, userController.getCurrentUser);
router.get("/users/logOut", auth.isAuth, userController.logOut);
router.get("/users/:id", userController.getOne);
router.get("/users/:id/videos", userController.getAllVideos);
router.get(
  "/users/:id/favorites",
  auth.isAuth,
  userController.getFavoriteVideosByUserId
);
router.put("/users/:id", fileUpload.single("avatar"), userController.updateOne);
router.get(
  "/users/:id/isFollowing",
  auth.isAuth,
  userController.checkFollowUser
);
router.get(
  "/users/:id/followers",
  auth.isAuth,
  userController.getFollowerListById
);
router.get(
  "/users/:id/following",
  auth.isAuth,
  userController.getFollowingListById
);
router.post("/users/:id/follow", auth.isAuth, userController.followUser);
router.post(
  "/users/:id/favorites",
  auth.isAuth,
  userController.addVideoToFavoritesByUserId
);
router.delete("/users/:id/unfollow", auth.isAuth, userController.unfollowUser);
router.delete("/users/:id", userController.removeOne);
router.delete(
  "/users/:id/favorites",
  auth.isAuth,
  userController.removeVideoToFavoritesByUserId
);

module.exports = router;
