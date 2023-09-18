import {
  handleNotFoundError,
  handleServerError,
} from '../middlewares/error.js';
import Post from '../models/PostModel.js';
import User from '../models/UserModel.js';
import { handleSuccessResponse } from '../middlewares/success.js';

//create
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    handleServerError(res, err);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    handleSuccessResponse(res, post);
  } catch (error) {
    handleNotFoundError(res, error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    handleSuccessResponse(res, post);
  } catch (error) {
    handleServerError(res, error);
  }
};

//update

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isliked = post.likes.get(userId);

    if (isliked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    handleSuccessResponse(res, updatedPost);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      handleNotFoundError(res, 'Post not found');
      return;
    }
    await Post.findByIdAndDelete(id);
    const updatedPosts = await Post.find();
    handleSuccessResponse(res, updatedPosts);
  } catch (error) {
    handleServerError(res, error);
  }
};
