const Vote = require('../models/Vote');
const Poll = require('../models/Poll');

// Cast a vote
exports.castVote = async (req, res) => {
  try {
    const { pollId, questionIndex, selectedOptionIndex } = req.body;
    const userId = req.user.id;

    // Check if poll exists
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    // Prevent duplicate voting by same user on same question
    const existingVote = await Vote.findOne({ pollId, questionIndex, userId });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted on this question' });
    }

    // Validate question and option indices
    if (
      questionIndex < 0 ||
      questionIndex >= poll.questions.length ||
      selectedOptionIndex < 0 ||
      selectedOptionIndex >= poll.questions[questionIndex].options.length
    ) {
      return res.status(400).json({ message: 'Invalid question or option index' });
    }

    // Create vote
    const vote = new Vote({ pollId, questionIndex, selectedOptionIndex, userId });
    await vote.save();
    res.status(201).json(vote);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all votes for a poll
exports.getVotesByPoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const votes = await Vote.find({ pollId }).populate('userId', 'username email');
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all votes by a user
exports.getVotesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const votes = await Vote.find({ userId }).populate('pollId', 'title');
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 