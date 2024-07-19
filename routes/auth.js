const express = require("express");

//file imports
const { signup, login, updateUser } = require("../controllers/authController");
const isAuth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.put("/update", isAuth, updateUser);

module.exports = router;
