import express from "express";

//file imports
import { registerEmergencyRequest } from "../controllers/emergencyController.js";

//middlewares
import isAuth from "../middlewares/isAuthMiddleware.js";

//create router
const router = express.Router();

//emergency request routes
router.post("/register", isAuth, registerEmergencyRequest);

export default router;
