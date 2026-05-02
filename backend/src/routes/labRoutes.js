const express = require('express');
const router = express.Router();
const { getLabs, createLab } = require('../controllers/labController');
const { protect } = require('../middlewares/authMiddleware');

// Get all labs (public route)
router.get('/', getLabs);

// Create a new lab (for seeding or admins)
router.post('/', createLab);

module.exports = router;
