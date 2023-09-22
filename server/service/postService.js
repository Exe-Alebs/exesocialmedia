import Post from '../models/PostModel.js';
import User from '../models/UserModel.js';

export const createNewPost = async (userId, description, picturePath) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

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
    return newPost;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    return Post.find();
  } catch (error) {
    throw error;
  }
};

export const getPostsByUserId = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return Post.find({ userId });
  } catch (error) {
    throw error;
  }
};

export const likeOrUnlikePost = async (postId, userId) => {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    await post.save();
    return post;
  } catch (error) {
    throw error;
  }
};

export const deletePostById = async (postId) => {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    await Post.findByIdAndDelete(postId);
  } catch (error) {
    throw error;
  }
};

export const updatePostById = async (postId, updatedData) => {
  try {
    const post = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
    });
    return post;
  } catch (error) {
    throw new Error('Failed to update the post');
  }
};
