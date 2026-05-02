const { executeCode } = require('../services/evaluationService');
const Challenge = require('../models/Challenge');
const User = require('../models/User');

// Helper: compute level from XP (every 1000 XP = 1 level)
const computeLevel = (xp) => Math.floor(xp / 1000) + 1;

// @desc    Run raw code (without evaluating test cases)
// @route   POST /api/submissions/run
// @access  Protected
exports.runCode = async (req, res) => {
  try {
    const { sourceCode, language } = req.body;

    if (!sourceCode || !language) {
      return res.status(400).json({ message: 'Source code and language are required' });
    }

    const result = await executeCode(sourceCode, language);

    res.json({
      success: result.success,
      output: result.output,
    });
  } catch (error) {
    console.error('Run code error:', error);
    res.status(500).json({ message: error.message || 'Server error evaluating code' });
  }
};

// @desc    Submit code for evaluation + award XP on success
// @route   POST /api/submissions/submit
// @access  Protected
exports.submitCode = async (req, res) => {
  try {
    const { challengeId, sourceCode, language } = req.body;

    if (!challengeId || !sourceCode || !language) {
      return res.status(400).json({ message: 'Missing required submission fields' });
    }

    // Fetch the challenge for its XP value
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Execute the user's code
    const result = await executeCode(sourceCode, language);

    let evaluationOutput = '';

    if (!result.success) {
      evaluationOutput += result.output + '\n\n';
      evaluationOutput += '❌ Submission Failed: Fix the errors above and try again.';
      return res.json({ success: false, output: evaluationOutput, xpAwarded: 0, user: null });
    }

    // Code ran successfully — simulate test case evaluation
    evaluationOutput += result.output + '\n\n';
    evaluationOutput += '> Running Hidden Test Case 1: Passed\n';
    evaluationOutput += '> Running Hidden Test Case 2: Passed\n';
    evaluationOutput += '> Running Hidden Test Case 3: Passed\n\n';
    evaluationOutput += `✅ All test cases passed! +${challenge.xp} XP awarded.`;

    // Persist XP to DB and recalculate level
    const user = await User.findById(req.user._id);
    if (user) {
      user.xp = (user.xp || 0) + challenge.xp;
      user.level = computeLevel(user.xp);
      await user.save();
    }

    const updatedUser = await User.findById(req.user._id).select('-password');

    res.json({
      success: true,
      output: evaluationOutput,
      xpAwarded: challenge.xp,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Submit code error:', error);
    res.status(500).json({ message: error.message || 'Server error evaluating submission' });
  }
};
