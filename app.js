const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//file imports
const authRoutes = require("./routes/auth");
const connectToMongoDB = require("./db/connectToMongoDB");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//route middlewares
app.use(authRoutes);

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
