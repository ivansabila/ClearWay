const express = require("express");
const isAuthenticatedMiddleware = require("../middlewares/isAuthenticatedMiddleware");
const LoginController = require("../controllers/LoginController");

const router = express.Router();

router.get("/", isAuthenticatedMiddleware, LoginController.index);
router.post("/", LoginController.check);
router.post("/logout", LoginController.logout);

module.exports = router;
