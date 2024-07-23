const express = require("express");
const { body } = require("express-validator");

const { updateAircraft } = require("../controllers/aircraftController");
const isAuth = require("../middlewares/authMiddleware");

const router = express.Router();

//aircraft routes
router.put("/update", [
  body("number", "Aircraft number should not be empty").notEmpty(),
  isAuth,
  updateAircraft,
]);

module.exports = router;
