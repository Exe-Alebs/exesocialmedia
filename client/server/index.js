//database and files
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
//routes import
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

//app import
import app from './middlewares/middleware.js';

//controller
import { register } from './controllers/auth.js';
import { verifyToken } from './middlewares/auth.js';
import { createPost } from './controllers/posts.js';

//models
import User from './models/User.js';
import Post from './models/Post.js';

//fakedata to populate backend models
import { users, posts } from './data/index.js';

// CONFIGS
dotenv.config();

//FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Route register with Files/pictures
app.post('/auth/register', upload.single('picture'), register);
//routes for post with files
app.post('/posts', verifyToken, upload.single('picture'), createPost);

//routes
app.use('/auth', authRoutes);
app.use('users', userRoutes);
app.use('/posts', postRoutes);

//DATABASE CONNECTION

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'exesocial',
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });
