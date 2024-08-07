import { body } from "express-validator";
import { Types } from "mongoose";

//user auth validations
export const validateSignup = [
  body("name", "Name must not be empty").trim().notEmpty(),
  body("email", "Please enter valid email").isEmail(),
  body("userType", "User type must not be empty").trim().notEmpty(),
  body("password", "Password must not be empty").trim().notEmpty(),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match.");
      }
      return true;
    }),
  body("companyName", "Company name must not be empty").trim().notEmpty(),
];

export const validateLogin = [
  body("email", "Please enter valid email").isEmail(),
  body("isOutlook", "isOutlook must be a boolean value").isBoolean(),
];

export const validateForgotPassword = [
  body("email", "Please enter valid email").isEmail(),
];

export const validateResetPassword = [
  body("newPassword", "New password must not be empty").trim().notEmpty(),
  body("confirmNewPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New passwords must match.");
      }
      return true;
    }),
];

//aircraft auth validations
export const validateRegisterAircraft = [
  body(
    "model",
    "Aicraft model must be in between min:1 and max:100 characters in length"
  )
    .trim()
    .isLength({ min: 1, max: 100 }),
  body(
    "manufacturer",
    "Manufacturer must be in between min:1 and max:100 characters in length."
  )
    .trim()
    .isLength({ min: 1, max: 100 }),
  body("airline")
    .trim()
    .isMongoId()
    .withMessage("Airline must be a valid ObjectId."),
  body("modelMedicalKits")
    .optional()
    .isArray()
    .withMessage("ModelMedicalKits must be an array of ObjectIds.")
    .custom((array) => array.every((item) => Types.ObjectId.isValid(item)))
    .withMessage("Every item in ModelMedicalKits must be a valid ObjectId."),
  body("number", "Aircraft number is required").trim().notEmpty(),
  body("pin", "Pin length must be six numbers in length")
    .trim()
    .isLength({
      min: 6,
      max: 6,
    })
    .custom((pin) => {
      const validNumberRegex = /^\d+$/;
      if (!validNumberRegex.test(pin)) {
        throw new Error(`${pin} is not a valid number`);
      }
      return true;
    }),
];

export const validateLoginAircraft = [
  [
    body("number", "Aircraft number should not be empty").trim().notEmpty(),
    body("pin", "Pin length must be exactly six digits")
      .trim()
      .isLength({ min: 6, max: 6 })
      .custom((pin) => {
        const validNumberRegex = /^\d+$/;
        if (!validNumberRegex.test(pin)) {
          throw new Error(`${pin} is not a valid number`);
        }
        return true;
      }),
  ],
];
