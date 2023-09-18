import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  picturePath,
  friends,
  location,
  occupation,
}) => {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error(
        'Email is already registered. Please use a different email address.'
      );
    }

    if (!firstName || !lastName || !email || !password) {
      throw new Error('Required fields are missing');
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
    return savedUser;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // Remove the password before returning user data
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return { token, user: userWithoutPassword };
  } catch (error) {
    throw error;
  }
};
