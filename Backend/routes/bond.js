const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bond = require('../models/Bond');

// Create bond request
router.post('/request', async (req, res) => {
  try {
    const { fromUserId, toUsername } = req.body;

    const toUser = await User.findOne({ username: toUsername });
    if (!toUser) return res.status(404).json({ message: 'User not found' });

    // Create bond
    const bond = new Bond({ fromUser: fromUserId, toUser: toUser._id });
    await bond.save();

    // Notification
    toUser.notifications.push({ fromUser: fromUserId, type: 'bond_request', message: 'You received a bond request' });
    await toUser.save();

    res.json({ message: 'Bond request sent', bond });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Grant points / accept bond
router.post('/grant', async (req, res) => {
  try {
    const { bondId, pointsGranted, message } = req.body;

    const bond = await Bond.findById(bondId).populate('toUser fromUser');
    if (!bond) return res.status(404).json({ message: 'Bond not found' });
    if (bond.status !== 'pending') return res.status(400).json({ message: 'Bond already granted' });

    bond.status = 'accepted';
    bond.pointsGranted = pointsGranted;
    bond.message = message;
    await bond.save();

    // Update toUser points
    bond.toUser.bondPoints += pointsGranted;
    bond.toUser.totalBonds += 1;
    await bond.toUser.save();

    res.json({ message: 'Bond granted successfully', bond });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all granted bonds for a user
router.get('/granted/:userId', async (req, res) => {
  try {
    const bonds = await Bond.find({ toUser: req.params.userId, status: 'accepted' })
      .populate('fromUser', 'username name');
    res.json(bonds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
