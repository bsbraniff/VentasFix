const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const verificarToken = require("../middleware/authMiddleware");

router.get("/", verificarToken, dashboardController.obtenerDashboard);

module.exports = router;