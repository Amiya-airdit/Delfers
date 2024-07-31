const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

exports.createFreshUserPassword = async (req, res, next) => {
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
      const error = new Error("One-time password has already been used");
      error.statusCode = 400;
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

exports.updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email, userType, isDeleted } = req.body;

    // Validate that at least one field is present in the request body
    if (!name && !email && !userType && !isDeleted) {
      const error = new Error("No data provided to update");
      error.statusCode = 400;
      throw error;
    }

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (userType !== undefined) updateData.userType = userType;
    if (isDeleted !== undefined) updateData.isDeleted = isDeleted;

    const user = await User.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await res
      .status(200)
      .json({ user, message: "User details updated successfully" });
  } catch (err) {
    next(err);
  }
};
