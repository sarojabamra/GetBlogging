import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../model/user.js";
import Token from "../model/token.js";
import mongoose from "mongoose";

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "Signup successful." });
  } catch (error) {
    return response.status(500).json({ msg: "Error during signup." });
  }
};

export const signinUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin,
      });
    } else {
      return response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Error while logging in the user." });
  }
};

export const getAllUsers = async (request, response) => {
  try {
    let users = await User.find({});
    console.log(users);
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json({ msg: "Error while getting all users." });
  }
};

export const deleteUser = async (request, response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(request.params.id);
    if (!deletedUser) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return response.status(500).json({ message: "An error happended here." });
  }
};

export const updateIsAdmin = async (req, res) => {
  //console.log("updateIsAdmin function was called with userId:", req.params.id);
  try {
    const data = req.params.id;
    const { userId } = JSON.parse(data);
    //console.log(userId);

    const objectId = new mongoose.Types.ObjectId(userId);
    //console.log(objectId);

    const user = await User.findOneAndUpdate(
      objectId,
      { isAdmin: true },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User updated to admin successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
