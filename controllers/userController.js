const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

exports.updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email, userType, isDeleted } = req.body;
    const user = await User.findOneAndUpdate(
      { _id },
      { name, email, userType, isDeleted },
      {
        new: true,
      }
    );

    await res
      .status(200)
      .json({ user, message: "User details updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updateFreshUserPassword = async (req, res, next) => {
  try {
    //handle validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 400;
      throw error;
    }

    const { _id, fresh } = req.user;
    const { newPassword } = req.body;

    if (!fresh) {
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
