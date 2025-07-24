const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: String,
  selectedX: String,
  selectedY: String,
  chartType: String,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
