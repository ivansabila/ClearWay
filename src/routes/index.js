const express = require("express");
const RegisterRoute = require("./RegisterRoute");
const LoginRoute = require("./LoginRoute");
const DashboardRoute = require("./DashboardRoute");
const UserRoute = require("./UserRoute");
const BookRoute = require("./BookRoute");

const router = express.Router();

router.use("/register", RegisterRoute);
router.use("/login", LoginRoute);
router.use("/", DashboardRoute);
router.use("/profile", UserRoute);
router.use("/book", BookRoute);

module.exports = router;
