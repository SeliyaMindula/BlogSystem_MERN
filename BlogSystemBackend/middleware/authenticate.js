// middleware/authenticate.js

import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the decoded user data to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticate;
