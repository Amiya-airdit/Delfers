const express = require("express");

const {
  updateAircraft,
  getAllAircrafts,
} = require("../controllers/aircraftController");
const isAuth = require("../middlewares/authMiddleware");

const router = express.Router();

//aircraft routes
router.get("/all-aircrafts", getAllAircrafts);

router.put("/update", isAuth, updateAircraft);

module.exports = router;
