const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.get("/", AdminController.index);
router.get("/history", AdminController.history);
router.get("/users", AdminController.users);
router.get("/detail/:idbook", AdminController.show);
router.post("/detail/:idbook", AdminController.checked);

module.exports = router;
