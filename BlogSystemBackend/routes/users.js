import express from 'express';
import User from '../models/users.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST /users - Register a new user
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /login - Authenticate a user
router.post('/login', async (req, res) => {
  try {
    // Convert email to lowercase before querying the database
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log(`No user found with email: ${email}`); // Debugging line
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`Found user: ${user.email}`); // Debugging line
    console.log(`Stored Hashed Password: ${user.password}`); // Debugging line

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("Password match:", isMatch);  // Debugging line
    console.log("Just password Variable:", req.body.password)
    console.log("User.Password variable:", user.password)


    if (isMatch) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      console.log('JWT Secret:', process.env.JWT_SECRET); // Debugging line
      res.status(200).json({ token, user });
    } else {
      console.log(`Password mismatch for user: ${email}`); // Debugging line
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error); // Log the full error
    res.status(500).json({ message: error.message });
  }
});




export default router;
