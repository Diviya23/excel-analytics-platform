const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Upload = require('../models/Upload');
const requireAuth = require('../middleware/requireAuth');


const checkAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};


router.get('/users', requireAuth, checkAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/stats', requireAuth, checkAdmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const fileCount = await Upload.countDocuments();
    res.json({ userCount, fileCount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/users/:id', requireAuth, checkAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
