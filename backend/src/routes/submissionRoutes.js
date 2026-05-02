const express = require('express');
const router = express.Router();
const { runCode, submitCode } = require('../controllers/submissionController');
const { protect } = require('../middlewares/authMiddleware');

// Execute code without evaluating test cases
router.post('/run', protect, runCode);

// Evaluate code against challenge test cases
router.post('/submit', protect, submitCode);

module.exports = router;
