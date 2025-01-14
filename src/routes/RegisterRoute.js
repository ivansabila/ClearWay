const express = require("express");
const AuthNMiddleware = require("../middlewares/AuthNMiddleware");
const isAuthenticatedMiddleware = require("../middlewares/isAuthenticatedMiddleware");
const RegisterController = require("../controllers/RegisterController");

const router = express.Router();

router.get("/", isAuthenticatedMiddleware, RegisterController.index);
router.post("/", AuthNMiddleware, RegisterController.store);

module.exports = router;
