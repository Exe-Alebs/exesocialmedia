import { handleServerError } from '../middlewares/error.js';
import { handleSuccessResponse } from '../middlewares/success.js';
import * as userService from '../service/userService.js';

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    handleSuccessResponse(res, user);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const friends = await userService.getUserFriendsById(id);
    handleSuccessResponse(res, friends);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const friends = await userService.addRemoveFriend(id, friendId);
    handleSuccessResponse(res, friends);
  } catch (error) {
    handleServerError(res, error);
  }
};
