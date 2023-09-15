import jwt from 'jsonwebtoken';
import { handleServerError, handleUnauthorizedError } from './error.js';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return handleUnauthorizedError();
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    res.user = verified;
    next();
  } catch (error) {
    handleServerError(res, error);
  }
};
