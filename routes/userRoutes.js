const express = require("express");
const { body } = require("express-validator");

const {
  updateUser,
  createFreshUserPassword,
} = require("../controllers/userController");
const isAuth = require("../middlewares/authMiddleware");
const validateLink = require("../middlewares/validateLinkMiddleware");

const router = express.Router();

//user routes
router.put(
  "/create-freshPassword/:userId",
  validateLink,
  [
    body("newPassword", "Password must not be empty").notEmpty(),
    body("confirmNewPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New passwords must match.");
      }
      return true;
    }),
  ],
  createFreshUserPassword
);

router.put("/update", isAuth, updateUser);

module.exports = router;
