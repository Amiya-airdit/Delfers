import express from "express";

//file imports
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  registerAircraft,
  loginAircraft,
} from "../controllers/authController.js";
import {
  validateSignup,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateRegisterAircraft,
  validateLoginAircraft,
} from "../validators/authValidations.js";

//middlewares
import checkLink from "../middlewares/checkLinkMiddleware.js";

//create router
const router = express.Router();

//user auth routes
router.post("/signup", validateSignup, signup);

router.post("/login", validateLogin, login);

router.post("/forgot-password", validateForgotPassword, forgotPassword);

router.put(
  "/reset-password/:userId",
  checkLink,
  validateResetPassword,
  resetPassword
);

//aircraft auth routes
router.post("/register-aircraft", validateRegisterAircraft, registerAircraft);

router.post("/login-aircraft", validateLoginAircraft, loginAircraft);

export default router;
