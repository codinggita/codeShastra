const express = require('express');
const cors = require('cors');

// Route Imports
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Built-in body parser

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('CodeShastra API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
