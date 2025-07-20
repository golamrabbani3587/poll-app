const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const auth = require('../middlewares/auth');

// Cast a vote (auth required)
router.post('/', auth, voteController.castVote);
// Get all votes for a poll
router.get('/poll/:pollId', voteController.getVotesByPoll);
// Get all votes by the authenticated user
router.get('/user/me', auth, voteController.getVotesByUser);

module.exports = router; 