const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById } = require('../controllers/projectController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Get all projects (public route so catalog is visible without login)
router.get('/', getProjects);

// Get single project by ID
router.get('/:id', getProjectById);

// Create a new project (restricted to admins)
router.post('/', protect, admin, createProject);

module.exports = router;
