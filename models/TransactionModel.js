const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  desc: {
    type: String,
    trim: true,
    required: [true, 'Please add some text'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative amount'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction; // to bring it in the controller
