import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // For parsing application/json

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, Blog System!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
