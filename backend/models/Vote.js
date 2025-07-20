const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true },
  questionIndex: { type: Number, required: true }, // index of the question in the poll
  selectedOptionIndex: { type: Number, required: true }, // index of the selected option in the question
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote; 