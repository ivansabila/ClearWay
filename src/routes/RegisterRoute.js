const express = require("express");
const RegisterController = require("../controllers/RegisterController");

const router = express.Router();

router.get("/", RegisterController.index);

module.exports = router;
