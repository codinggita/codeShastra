const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public (or Private if you prefer, leaving public for now)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error while fetching projects.' });
  }
};

// @desc    Create a new project (Admin/Seeder)
// @route   POST /api/projects
// @access  Public for seeding purposes currently
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error while creating project.' });
  }
};
