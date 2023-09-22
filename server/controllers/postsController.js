import {
  handleServerError,
  handleNotFoundError,
} from '../middlewares/error.js';
import * as postService from '../service/postService.js';
import { handleSuccessResponse } from '../middlewares/success.js';

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const newPost = await postService.createNewPost(
      userId,
      description,
      picturePath
    );
    const allPosts = await postService.getAllPosts();
    handleSuccessResponse(res, allPosts);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await postService.getAllPosts();
    handleSuccessResponse(res, allPosts);
  } catch (error) {
    handleNotFoundError(res, error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await postService.getPostsByUserId(userId);
    handleSuccessResponse(res, userPosts);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const updatedPost = await postService.likeOrUnlikePost(id, userId);
    handleSuccessResponse(res, updatedPost);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await postService.deletePostById(id);
    const allPosts = await postService.getAllPosts();
    handleSuccessResponse(res, allPosts);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedData = req.body; // Assuming the request body contains updated post data
    const updatedPost = await postService.updatePostById(postId, updatedData);
    handleSuccessResponse(res, updatedPost);
  } catch (error) {
    handleServerError(res, error);
  }
};
