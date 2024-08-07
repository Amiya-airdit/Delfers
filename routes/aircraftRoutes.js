import express from "express";

//file imports
import {
  updateAircraft,
  getAllAircrafts,
} from "../controllers/aircraftController.js";

//middlewares
import isAuth from "../middlewares/isAuthMiddleware.js";

//create router
const router = express.Router();

//aircraft routes
router.get("/all-aircrafts", getAllAircrafts);

router.put("/update", isAuth, updateAircraft);

export default router;
