const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const User = require("../models/user");
const Aircraft = require("../models/aircraft");
const generateToken = require("../utils/generateToken");

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

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
    const EMAIL = email.toLowerCase();

    const user = await User.findOne({ email: EMAIL });
    if (user) {
      const error = new Error("Already registered user, please login");
      error.statusCode = 409;
      throw error;
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email: EMAIL,
      userType,
      password: hashedPassword,
      companyName,
      isDeleted: false,
      fresh: true,
    });

    const newSecret = process.env.USER_LOGIN_SECRET + newUser.password;
    const oneTimeToken = generateToken(newUser, "user", newSecret, "30d");

    //send email and response
    const result = await transporter.sendMail({
      from: '"MDOB" <admin@mdob.com>',
      to: newUser.email,
      subject: "Greetings",
      html: `<h4>Hi ${newUser.name},</h4>
              <p>Welcome to the MDOB.</p>
              <p>Click this <a href='${process.env.CLIENT_URL}/create-password/${newUser._id}/${oneTimeToken}'>link</a> to create your new password</a>
              <p><b>Note : </b>This link is one time use only</p>`,
    });

    if (result.rejected.length > 0) {
      const error = new Error("Failed to create account");
      error.statusCode = 500;
      throw error;
    }

    await newUser.save();

    await res
      .status(201)
      .json({ newUser, message: "Your new account has been created" });
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
    const EMAIL = email.toLowerCase();

    const user = await User.findOne({ email: EMAIL });

    if (!user) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      throw error;
    }

    if (isOutlook) {
      return res.status(200).json({ user, message: "Loggedin successfully" });
    }

    let PASSWORD = password || "";
    const check = await bcryptjs.compare(PASSWORD, user.password);
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

// exports.forgotPassword = async (req, res, next) => {
//   try {
//     //handle validation errors using express-validator
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const error = new Error(errors.array()[0].msg);
//       error.statusCode = 400;
//       throw error;
//     }

//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       const error = new Error("User not registered");
//       error.statusCode = 401;
//       throw error;
//     }

//     if (user.fresh) {
//       const error = new Error(
//         "First generate password using one-time link, which have sent to your email"
//       );
//       error.statusCode = 403;
//       throw error;
//     }

//     //create one time link and valid for 15mins
//     const token = generateToken(
//       user,
//       "user",
//       `${USER_FORGOTPASSWORD_SECRET}+${user.password}`,
//       "5m"
//     );
//     const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;

//     //send link to email
//     const result = await transporter.sendMail({
//       from: '" Admin" <admin001@MDOB.com>',
//       to: user.email,
//       subject: "Password reset link",
//       html: `<h4>Hi ${user.name},</h4>
//                   <p>Click this <a href=${link}>link</a> to reset your password.</p>
//                   <p>Note: The link will expire in 5 minutes and one time use only.</p>`,
//     });

//     if (result.accepted.length === 0) {
//       const error = new Error("Failed to send email, please try again");
//       error.statusCode = 401;
//       throw error;
//     }

//     await res
//       .status(200)
//       .json({ token, link, message: "EMAIL sent successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

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

    const { model, manufacturer, airline, modelMedicalKits, number, pin } =
      req.body;

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
      model,
      manufacturer,
      airline,
      modelMedicalKits,
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
