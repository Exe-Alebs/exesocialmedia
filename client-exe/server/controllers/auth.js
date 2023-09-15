import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  handleNotFoundError,
  handleServerError,
  handleValidationErrors,
} from '../middlewares/error.js';

//register
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return handleValidationErrors(res, 'Required fields are missing');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location,
      friends,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    handleServerError(res, error);
  }
};

//login
export const login = async (res, req) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return handleNotFoundError();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleValidationErrors();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    handleServerError(res, error);
  }
};
