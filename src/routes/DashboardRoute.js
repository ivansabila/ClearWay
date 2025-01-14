const express = require("express");
const DashboardController = require("../controllers/DashboardController");

const router = express.Router();

router.get("/", DashboardController.index);

module.exports = router;
