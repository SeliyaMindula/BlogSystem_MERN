import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import categoriesRouter from './routes/categories';
import tagsRouter from './routes/tags';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

app.use(express.json());

// Use routes
app.use(usersRouter);
app.use(postsRouter);
app.use(categoriesRouter);
app.use(tagsRouter);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, Blog System!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
