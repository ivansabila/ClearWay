const express = require("express");
const validateBookMiddleware = require("../middlewares/validateBookMiddleware");
const BookController = require("../controllers/BookController");

const router = express.Router();

router.get("/:id", BookController.index);
router.post("/:id", validateBookMiddleware, BookController.store);
router.get("/:id/detail/:idbook", BookController.show);

module.exports = router;
