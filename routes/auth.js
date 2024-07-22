const express = require("express");
const { body } = require("express-validator");

//file imports
const {
  signup,
  login,
  updateUser,
  updateFreshUserPassword,
  registerAircraft,
  loginAircraft,
  updateAircraft,
} = require("../controllers/authController");
const isAuth = require("../middlewares/authMiddleware");

//create router
const router = express.Router();

//user routes
router.post(
  "/signup",
  [
    body("name", "Name must not be empty").notEmpty(),
    body("email", "Please enter valid email").isEmail(),
    body("userType", "User type must not be empty").notEmpty(),
    body("password", "Password must not be empty").notEmpty(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match.");
      }
      return true;
    }),
    body("companyName", "Company name must not be empty").notEmpty(),
  ],
  signup
);
router.post(
  "/login",
  [
    body("email", "Please enter valid email").isEmail(),
    body("password", "Password must not be empty").notEmpty(),
  ],
  login
);
router.put("/update-user", isAuth, updateUser);
router.put(
  "/update-freshPassword",
  [
    body("newPassword", "Password must not be empty").notEmpty(),
    body("confirmNewPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New passwords must match.");
      }
      return true;
    }),
  ],
  isAuth,
  updateFreshUserPassword
);

//aircraft routes
router.post(
  "/register-aircraft",
  [
    body("number", "Aircraft number should not be empty").notEmpty(),
    body("pin", "Pin length must be min:6 numbers in length")
      .isLength({
        min: 6,
      })
      .custom((pin) => {
        const validNumberRegex = /^\d+$/;

        if (!validNumberRegex.test(pin)) {
          throw new Error(`${pin} is not a valid number`);
        }
        return true;
      }),
  ],
  registerAircraft
);
router.post(
  "/login-aircraft",
  [
    [
      body("number", "Aircraft number should not be empty").notEmpty(),
      body("pin", "Pin length must be min:6 numbers in length")
        .isLength({
          min: 6,
        })
        .custom((pin) => {
          const validNumberRegex = /^\d+$/;

          if (!validNumberRegex.test(pin)) {
            throw new Error(`${pin} is not a valid number`);
          }
          return true;
        }),
    ],
  ],
  loginAircraft
);
router.put("/update-aircraft", [
  body("number", "Aircraft number should not be empty").notEmpty(),
  isAuth,
  updateAircraft,
]);

module.exports = router;
