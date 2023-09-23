import * as authService from '../service/authService.js';
import {
  handleServerError,
  handleValidationErrors,
} from '../middlewares/error.js';
import { handleSuccessResponse } from '../middlewares/success.js';

export const register = async (req, res) => {
  try {
    const { body } = req;
    const savedUser = await authService.registerUser(body);
    handleSuccessResponse(res, savedUser, 201);
  } catch (error) {
    if (error.message === 'Required fields are missing') {
      handleValidationErrors(res, error.message);
    } else if (
      error.message ===
      'Email is already registered. Please use a different email address.'
    ) {
      handleValidationErrors(res, error.message);
    } else {
      handleServerError(res, error);
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.loginUser(email, password);
    handleSuccessResponse(res, userData, 200);
  } catch (error) {
    if (
      error.message === 'User not found' ||
      error.message === 'Invalid password'
    ) {
      handleValidationErrors(res, error.message);
    } else {
      handleServerError(res, error);
    }
  }
};
