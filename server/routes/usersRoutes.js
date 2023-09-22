import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUserController,
} from '../controllers/usersController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

///get routes(read)

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

//patch(update)

router.patch('/:id/:friendId', verifyToken, addRemoveFriend);
router.put('/id', verifyToken, updateUserController);

export default router;
