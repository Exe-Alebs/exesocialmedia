import User from '../models/UserModel.js';

export const getUserById = async (id) => {
  return User.findById(id);
};

export const getUserFriendsById = async (id) => {
  const user = await User.findById(id);
  const friends = await Promise.all(
    user.friends.map((friendId) => getUserById(friendId))
  );
  return friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
      _id,
      firstName,
      lastName,
      occupation,
      location,
      picturePath,
    })
  );
};

// export const addRemoveFriend = async (userId, friendId) => {
//   try {
//     const user = await User.findById(userId);
//     const friend = await User.findById(friendId);

//     if (!user || !friend) {
//       throw new Error('User or friend not found');
//     }

//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== userId);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(userId);
//     }

//     await user.save();
//     await friend.save();
//     return getUserFriendsById(userId);
//   } catch (error) {
//     throw error;
//   }
// };

export const updateUser = async (userId, updatedData) => {
  const user = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });
  return user;
};
