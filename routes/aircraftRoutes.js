const express = require("express");

const { updateAircraft } = require("../controllers/aircraftController");
const isAuth = require("../middlewares/authMiddleware");

const router = express.Router();

//aircraft routes
router.put("/update", isAuth, updateAircraft);

module.exports = router;
