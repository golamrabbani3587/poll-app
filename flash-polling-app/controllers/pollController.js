const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const mongoose = require('mongoose');

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const createdBy = req.user.id;
    const poll = new Poll({ title, questions, createdBy });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get poll by ID
exports.getPollById = async (req, res) => {
  try {
    let poll;
    try {
      poll = await Poll.findById(req.params.id).populate('createdBy', 'username email');
    } catch (err) {
      console.error('Error fetching poll:', err);
      return res.status(500).json({ message: 'Error fetching poll', error: err.message });
    }
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    let votes = [];
    try {
      // poll._id is already an ObjectId
      votes = await Vote.find({ pollId: poll._id });
    } catch (err) {
      console.error('Error fetching votes:', err);
      return res.status(500).json({ message: 'Error fetching votes', error: err.message });
    }

    let pollObj;
    try {
      pollObj = poll.toObject();
      pollObj.questions = pollObj.questions.map((question, qIdx) => {
        const optionsWithVotes = question.options.map((option, oIdx) => {
          const count = votes.filter(v => v.questionIndex === qIdx && v.selectedOptionIndex === oIdx).length;
          return { ...option, votes: count };
        });
        return { ...question, options: optionsWithVotes };
      });
    } catch (err) {
      console.error('Error processing poll object:', err);
      return res.status(500).json({ message: 'Error processing poll object', error: err.message });
    }

    res.json(pollObj);
  } catch (err) {
    console.error('getPollById unknown error:', err);
    res.status(500).json({ message: 'Unknown server error', error: err.message });
  }
};

// Get all polls
exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate('createdBy', 'username email');
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get polls by user (createdBy)
exports.getPollsByUser = async (req, res) => {
  try {
    const polls = await Poll.find({ createdBy: req.user.id }).populate('createdBy', 'username email');
    // For each poll, aggregate votes for each option
    const pollsWithVotes = await Promise.all(polls.map(async (poll) => {
      const votes = await Vote.find({ pollId: poll._id });
      const pollObj = poll.toObject();
      pollObj.questions = pollObj.questions.map((question, qIdx) => {
        const optionsWithVotes = question.options.map((option, oIdx) => {
          const count = votes.filter(v => v.questionIndex === qIdx && v.selectedOptionIndex === oIdx).length;
          return { ...option, votes: count };
        });
        return { ...question, options: optionsWithVotes };
      });
      return pollObj;
    }));
    res.json(pollsWithVotes);
  } catch (err) {
    console.error('getPollsByUser error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 