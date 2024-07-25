const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const Aircraft = require("../models/aircraft");
const generateToken = require("../utils/generateToken");

//user controllers
exports.signup = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { name, email, userType, password, companyName } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Already registered user, please login");
      error.statusCode = 409;
      throw error;
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      userType,
      password: hashedPassword,
      companyName,
      fresh: true,
    });

    await res
      .status(201)
      .json({ newUser, message: "Your new account has been created!" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { email, password, isOutlook } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      throw error;
    }

    if (isOutlook) {
      return res.status(200).json({ user, message: "Loggedin successfully" });
    }

    const check = await bcryptjs.compare(password, user.password);
    if (!check) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(
      user,
      "user",
      process.env.USER_LOGIN_SECRET,
      "30d"
    );

    await res
      .status(200)
      .json({ token, user, message: "Loggedin successfully" });
  } catch (err) {
    next(err);
  }
};

//aircraft controllers
exports.registerAircraft = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { number, pin } = req.body;

    const aircraft = await Aircraft.findOne({ number });
    if (aircraft) {
      const error = new Error("Aircraft already registered");
      error.statusCode = 409;
      throw error;
    }

    //hash pin
    const salt = await bcryptjs.genSalt(10);
    const hashedPin = await bcryptjs.hash(pin, salt);

    const newAircraft = await Aircraft.create({
      number,
      pin: hashedPin,
    });

    await res
      .status(201)
      .json({ newAircraft, message: "Aircraft registered successfully" });
  } catch (err) {
    next(err);
  }
};

exports.loginAircraft = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { number, pin } = req.body;

    const aircraft = await Aircraft.findOne({ number });
    if (!aircraft) {
      const error = new Error("Aircraft not registered");
      error.statusCode = 401;
      throw error;
    }

    const check = await bcryptjs.compare(pin, aircraft.pin);
    if (!check) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(
      aircraft,
      "aircraft",
      process.env.AIRCRAFT_LOGIN_SECRET,
      "30d"
    );

    await res
      .status(200)
      .json({ token, aircraft, message: "Loggedin successfully" });
  } catch (err) {
    next(err);
  }
};
