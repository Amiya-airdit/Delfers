const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const Aircraft = require("../models/aircraft");
const generateToken = require("../utils/generateToken");

//user controllers
exports.signup = async (req, res, next) => {
  try {
    const { name, email, userType, password, companyName } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Email already exist, please login");
      error.statusCode = 403;
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not registered");
      error.statusCode = 400;
      throw error;
    }

    const check = await bcryptjs.compare(password, user.password);
    if (!check) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user, process.env.USER_LOGIN_SECRET, "30d");
    console.log(token);

    await res.status(200).json({ message: "Loggedin successfully", user });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { _id, name, email, userType, companyName, isDeleted } = req.body;
    const user = await User.findOneAndUpdate(
      { _id },
      { name, email, userType, companyName, isDeleted },
      {
        new: true,
      }
    );

    await res.status(200).json({ message: "User updated", user });
  } catch (err) {
    next(err);
  }
};

exports.updateFreshUserPassword = async (req, res, next) => {
  try {
    const { _id, fresh } = req.user;
    const { newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      const error = new Error("New passwords must match");
      error.statusCode = 401;
      throw error;
    }

    if (fresh) {
      const error = new Error("Your one time password change has been used");
      error.statusCode = 401;
      throw error;
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const user = await User.findOneAndUpdate(
      { _id },
      { password: hashedPassword, fresh: false },
      {
        new: true,
      }
    );

    await res
      .status(200)
      .json({ message: "Your new password has created!", user });
  } catch (err) {
    next(err);
  }
};

//aircraft controllers
exports.registerAircraft = async (req, res, next) => {
  try {
    const { number, pin } = req.body;

    const aircraft = await Aircraft.findOne({ number });
    if (aircraft) {
      const error = new Error("Aircraft already registered");
      error.statusCode = 403;
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
      process.env.AIRCRAFT_LOGIN_SECRET,
      "30d"
    );
    console.log(token);

    await res.status(200).json({ message: "Loggedin successfully", aircraft });
  } catch (err) {
    next(err);
  }
};
