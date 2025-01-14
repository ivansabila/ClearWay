const express = require("express");
const AuthZMiddleware = require("../middlewares/AuthZMiddleware");
const DashboardController = require("../controllers/DashboardController");

const router = express.Router();

router.use(AuthZMiddleware);
router.get("/", DashboardController.index);

module.exports = router;
