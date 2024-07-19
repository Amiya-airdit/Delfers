const express = require("express");

//file imports
const {
  signup,
  login,
  updateUser,
  updateFreshUserPassword,
  registerAircraft,
  loginAircraft,
} = require("../controllers/authController");
const isAuth = require("../middlewares/authMiddleware");

//create router
const router = express.Router();

//user routes
router.post("/signup", signup);
router.post("/login", login);
router.put("/update", isAuth, updateUser);
router.put("/update-freshPassword", isAuth, updateFreshUserPassword);

//aircraft routes
router.post("/register-aircraft", registerAircraft);
router.post("/login-aircraft", loginAircraft);

module.exports = router;
