import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//file imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aircraftRoutes from "./routes/aircraftRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//route middlewares
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/aircraft", aircraftRoutes);
app.use("/emergency-request", emergencyRoutes);

//global error handler
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal server error";
  res.status(statusCode).json({ error: errorMessage });
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port : ${PORT}`);
});
