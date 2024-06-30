import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import CustomError from "../error/custom-error.js";
import Listing from "../models/listing.js";
import { nanoid } from "nanoid";

const signup = async (req, res) => {
  const { name, password, email } = req.body;
  // console.log(name);
  const existingUserWithEmail = await User.findOne({ email });

  if (existingUserWithEmail)
    throw new CustomError("User with this email already exists", 400);

  const hashedUserPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name,
    email,
    password: hashedUserPassword,
  });

  const savedUser = await newUser.save();

  const token = jwt.sign(
    { email, _id: savedUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  res.send({ success: "true", message: "Successfull signup", token });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUserData = await User.findOne({ email });

  if (!existingUserData) throw new CustomError("No user with email found", 401);

  if (!(await bcrypt.compare(password, existingUserData.password)))
    throw new CustomError("Invalid password", 401);

  const token = jwt.sign(
    { email, _id: existingUserData._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  res.send({ success: "true", message: "User Logged In", token });
};

const getAllUserData = async (req, res, next) => {
  const { _id } = req.jwtPayload;
  const existingUser = await User.findById(_id);
  const allDonations = await Listing.find({ uid: _id });
  // console.log({ profile: { ...existingUser }, donations: { ...allDonations } });
  res.send({
    success: "true",
    data: { profile: existingUser, donations: allDonations },
  });
};

export { loginUser, signup, getAllUserData };
