import express from "express";

//file imports
import {
  createFreshUserPassword,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  validateCreateFreshUserPassword,
  validateDeleteUser,
} from "../validators/userValidations.js";

//middlewares
import isAuth from "../middlewares/isAuthMiddleware.js";
import validateLink from "../middlewares/validateLinkMiddleware.js";

//create router
const router = express.Router();

//user routes
router.put(
  "/create-freshPassword/:userId",
  validateLink,
  validateCreateFreshUserPassword,
  createFreshUserPassword
);

router.put("/update", isAuth, updateUser);

router.delete("/delete", validateDeleteUser, deleteUser);

export default router;
