import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

//file imports
import User from "../models/user.js";
import Aircraft from "../models/aircraft.js";
import generateToken from "../utils/generateToken.js";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

//user auth controllers
export const signup = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { name, email, userType, password, companyName } = req.body;
    const trimmedData = {
      name: name.trim(),
      email: email.toLowerCase(),
      userType: userType.trim(),
      password: password.trim(),
      companyName: companyName.trim(),
    };

    const user = await User.findOne({ email: trimmedData.email });
    if (user) {
      const error = new Error("Already registered user, please login");
      error.statusCode = 409;
      throw error;
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(trimmedData.password, salt);

    const newUser = new User({
      name: trimmedData.name,
      email: trimmedData.email,
      userType: trimmedData.userType,
      password: hashedPassword,
      companyName: trimmedData.companyName,
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

export const login = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { email, password, isOutlook } = req.body;
    const trimmedData = {
      email: email.toLowerCase(),
      password: password.trim(),
      isOutlook,
    };

    const user = await User.findOne({ email: trimmedData.email });

    if (!user) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      throw error;
    }

    if (isOutlook) {
      return res.status(200).json({ user, message: "Loggedin successfully" });
    }

    const PASSWORD = trimmedData.password || "";
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

export const forgotPassword = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { email } = req.body;
    const trimmedData = {
      email: email.toLowerCase(),
    };

    const user = await User.findOne({ email: trimmedData.email });
    if (!user) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      throw error;
    }

    if (user.fresh) {
      const error = new Error(
        "First generate password using one-time link, which have sent to your email"
      );
      error.statusCode = 403;
      throw error;
    }

    //create one time link and valid for 5mins
    const secret = process.env.USER_FORGOTPASSWORD_SECRET + user.password;
    const token = generateToken(user, "user", secret, "5m");
    const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;

    //send link to email
    const result = await transporter.sendMail({
      from: '"MDOB" <admin@mdob.com>',
      to: user.email,
      subject: "Password reset link",
      html: `<h4>Hi ${user.name},</h4>
                  <p>Click this <a href=${link}>link</a> to reset your password.</p>
                  <p>Note: The link will expire in 5 minutes and one time use only.</p>`,
    });

    if (result.accepted.length === 0) {
      const error = new Error("Failed to send email, please try again");
      error.statusCode = 401;
      throw error;
    }

    await res.status(200).json({
      token,
      link,
      message: "Password reset link sent to Email sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { _id: userId } = req.user;
    const { newPassword } = req.body;
    const trimmedData = {
      newPassword: newPassword.trim(),
    };

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(trimmedData.newPassword, salt);

    const user = await User.findById(userId);

    user.password = hashedPassword;
    await user.save();

    //send email and response
    transporter.sendMail(
      {
        from: '"MDOB" <admin@mdob.com>',
        to: user.email,
        subject: "Password changed",
        html: `<h4>Hi ${user.name},</h4>
                  <p>Your password has been reset successfully.</p>`,
      },
      (error, response) => {
        if (error) {
          console.log(error.message);
        }
      }
    );

    await res
      .status(201)
      .json({ user, message: "The password has been reset successfully" });
  } catch (err) {
    next(err);
  }
};

//aircraft auth controllers
export const registerAircraft = async (req, res, next) => {
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
    const trimmedData = {
      model: model.trim(),
      manufacturer: manufacturer.trim(),
      airline: airline.trim(),
      modelMedicalKits,
      number: number.trim(),
      pin: pin.trim(),
    };

    const aircraft = await Aircraft.findOne({ number: trimmedData.number });
    if (aircraft) {
      const error = new Error("Aircraft already registered");
      error.statusCode = 409;
      throw error;
    }

    //hash pin
    const salt = await bcryptjs.genSalt(10);
    const hashedPin = await bcryptjs.hash(trimmedData.pin, salt);

    const newAircraft = await Aircraft.create({
      model: trimmedData.model,
      manufacturer: trimmedData.manufacturer,
      airline: trimmedData.airline,
      modelMedicalKits: trimmedData.modelMedicalKits,
      number: trimmedData.number,
      pin: hashedPin,
    });

    await res
      .status(201)
      .json({ newAircraft, message: "Aircraft registered successfully" });
  } catch (err) {
    next(err);
  }
};

export const loginAircraft = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { number, pin } = req.body;
    const trimmedData = {
      number: number.trim(),
      pin: pin.trim(),
    };

    const aircraft = await Aircraft.findOne({ number: trimmedData.number });
    if (!aircraft) {
      const error = new Error("Aircraft not registered");
      error.statusCode = 401;
      throw error;
    }

    const check = await bcryptjs.compare(trimmedData.pin, aircraft.pin);
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
