const express = require("express");
const upload = require("../utils/uploadImage");
const validateProfileMiddleware = require("../middlewares/validateProfileMiddleware");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/:id", UserController.index);
router.get("/:id/edit", UserController.edit);
router.post("/:id/edit", upload.single("pdf"), validateProfileMiddleware, UserController.update);

module.exports = router;
