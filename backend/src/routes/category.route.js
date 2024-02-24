const router = require("express").Router();

const categoryController = require("../controllers/category.controller");

router.get("/categories", categoryController.getAll);
router.get("/categories/:id", categoryController.getOne);

module.exports = router;
