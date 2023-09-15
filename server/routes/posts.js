import express from 'express';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Read (get) posts from the feed
router.get('/', verifyToken, getFeedPosts);

// Read (get) posts of a specific user by userId
router.get('/:userId/posts', getUserPosts);

// Update (patch) - Like a post by post id
router.patch('/:id/like', verifyToken, likePost);

// Delete - Delete a post by post id
router.delete('/:id', verifyToken, deletePost);

export default router;
