const express = require("express");
const { body } = require("express-validator");

//file imports
const {
  signup,
  login,
  registerAircraft,
  loginAircraft,
} = require("../controllers/authController");

//create router
const router = express.Router();

//user auth routes
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

//aircraft auth routes
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
          throw new Error(
            `${pin} is not a valid pin, it must contain between 0-9 numbers`
          );
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

module.exports = router;
