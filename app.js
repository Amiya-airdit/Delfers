const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//file imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const aircraftRoutes = require("./routes/aircraftRoutes");
const connectToMongoDB = require("./db/connectToMongoDB");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//route middlewares
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/aircraft", aircraftRoutes);

//global error handler
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 400;
  const errorMessage = err.message || "Something went wrong";
  res.status(statusCode).json({ error: errorMessage });
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port : ${PORT}`);
});
