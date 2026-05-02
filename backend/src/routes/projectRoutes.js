const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

// Get all projects (protected route, requires user to be logged in)
router.get('/', protect, getProjects);

// Create a new project (for seeding or admins)
router.post('/', createProject);

module.exports = router;
