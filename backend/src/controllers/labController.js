const Lab = require('../models/Lab');

// @desc    Get all labs
// @route   GET /api/labs
// @access  Public
exports.getLabs = async (req, res) => {
  try {
    const labs = await Lab.find().sort({ createdAt: -1 });
    res.json(labs);
  } catch (error) {
    console.error('Error fetching labs:', error);
    res.status(500).json({ message: 'Server error while fetching labs.' });
  }
};

// @desc    Create a new lab (Admin/Seeder)
// @route   POST /api/labs
// @access  Public for seeding purposes currently
exports.createLab = async (req, res) => {
  try {
    const lab = await Lab.create(req.body);
    res.status(201).json(lab);
  } catch (error) {
    console.error('Error creating lab:', error);
    res.status(500).json({ message: 'Server error while creating lab.' });
  }
};
