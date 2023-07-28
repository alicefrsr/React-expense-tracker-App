const Transaction = require('../models/TransactionModel');

// @desc Get  all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  // res.send('GET transactions');
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      results: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      // message: err.message,
      error: 'Servor error',
    });
  }
};

// @desc Add transaction
// @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
  // res.send('POST transaction');
  try {
    const { desc, amount } = req.body;

    const newTransaction = await Transaction.create(req.body); // req.body.desc, req.body.amount etc..
    return res.status(201).json({
      success: true,
      data: newTransaction,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errorMessages = Object.values(err.errors).map(val => val.message);
      const message = `Invalid input data. ${errorMessages.join('. ')}`;
      res.status(400).json({
        success: false,
        // error: errorMessages,
        error: message,
      });
    }
  }
};

// @desc Delete transaction
// @route DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  // res.send('DELETE transaction');
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: `No transaction found with id ${req.params.id}`,
        // if castError ie id=1234 ie not correct format, this goes to catch block instead
      });
    }
    // res.status(204).json({
    res.status(200).json({
      success: true,
      data: {}, // or null
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: 'Servor error',
    });
  }
};
