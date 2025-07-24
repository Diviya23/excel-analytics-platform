const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const History = require('../models/History');

// ✅ Save chart history (called when user views a chart)
router.post('/save', requireAuth, async (req, res) => {
  try {
    const { fileName, selectedX, selectedY, chartType } = req.body;

    const newEntry = new History({
      user: req.user.id,          // from JWT middleware
      fileName,
      selectedX,
      selectedY,
      chartType,
      uploadDate: new Date()
    });

    await newEntry.save();
    res.status(201).json({ message: 'History saved successfully' });
  } catch (err) {
    console.error('Error saving history:', err);
    res.status(500).json({ error: 'Failed to save history' });
  }
});

// ✅ Fetch chart history for logged-in user
router.get('/my', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await History.find({ user: userId }).sort({ uploadDate: -1 });
    res.json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Server error while fetching history' });
  }
});

module.exports = router;
