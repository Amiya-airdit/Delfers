const express = require("express");

//file imports
const {
  signup,
  login,
  updateUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.put("/update", updateUser);                                                                                                                

module.exports = router;
