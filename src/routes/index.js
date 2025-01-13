const express = require("express");
const RegisterRoute = require("./RegisterRoute");

const router = express.Router();

router.use("/register", RegisterRoute);

module.exports = router;
