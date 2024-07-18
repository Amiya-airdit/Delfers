const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const generateToken = require("../utils/generateToken");

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
    });

    await res
      .status(201)
      .json({ newUser, msg: "Your new account has been created!" });
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

    const token = generateToken(user, process.env.LOGIN_SECRET, "12h");
    console.log(token);

    res.status(200).json({ message: "Loggedin successfully", user });
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

    res.status(200).json({ message: "User updated", user });
  } catch (err) {
    next(err);
  }
};
