import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
  sender: {
    ref: 'User',
  },
  recipient: {},
});
