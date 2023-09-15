import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to toggle between light and dark mode
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },

    // Action to set user login information
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Action to clear user login information (log out)
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    // Action to update user's friends list
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error('user friends no dey exist');
      }
    },

    // Action to set an array of posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    // Action to update a specific post within the posts array
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setPost, setFriends, setLogin, setLogout, setPosts, setMode } =
  authSlice.actions;

export default authSlice.reducer;
