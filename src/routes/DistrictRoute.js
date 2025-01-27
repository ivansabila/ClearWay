const express = require("express");
const DistrictController = require("../controllers/DistrictController");

const router = express.Router();

router.get("/", DistrictController.index);
router.get("/history", DistrictController.history);
router.get("/users", DistrictController.users);
router.get("/detail/:idbook", DistrictController.show);
router.post("/detail/:idbook", DistrictController.checked);

module.exports = router;
