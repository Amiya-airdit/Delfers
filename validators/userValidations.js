import { body } from "express-validator";

//user validations
export const validateCreateFreshUserPassword = [
  body("newPassword", "Password must not be empty").trim().notEmpty(),
  body("confirmNewPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New passwords must match.");
      }
      return true;
    }),
];

export const validateDeleteUser = [
  body("email", "Please enter valid email").isEmail(),
];
