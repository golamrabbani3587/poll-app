const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
const auth = require('../middlewares/auth');

// Create poll (auth required)
router.post('/', auth, pollController.createPoll);
// Get poll by id
router.get('/:id', auth, pollController.getPollById);
// Get all polls
router.get('/', pollController.getAllPolls);
// Get polls by user (auth required)
router.get('/user/me', auth, pollController.getPollsByUser);

module.exports = router; 