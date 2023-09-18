import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/users.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

///get routes(read)

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

//patch(update)

router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
