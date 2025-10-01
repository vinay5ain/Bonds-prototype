const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bond = require('../models/Bond');

// ================================
// Create Bond Request
// ================================
router.post('/request', async (req, res) => {
  try {
    const { fromUserId, toUsername } = req.body;

    const toUser = await User.findOne({ username: toUsername });
    if (!toUser) return res.status(404).json({ message: 'User not found' });

    const bond = new Bond({ fromUser: fromUserId, toUser: toUser._id });
    await bond.save();

    // Add notification for recipient
    toUser.notifications.push({
      fromUser: fromUserId,
      type: 'bond_request',
      message: 'You received a bond request'
    });
    await toUser.save();

    res.json({ message: 'Bond request sent', bond });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================================
// Accept or Reject Bond Request
// ================================
router.post('/respond', async (req, res) => {
  try {
    const { bondId, action, pointsGranted } = req.body; // action: 'accept' or 'reject'

    const bond = await Bond.findById(bondId).populate('fromUser toUser');
    if (!bond) return res.status(404).json({ message: 'Bond not found' });

    if (bond.status !== 'pending') {
      return res.status(400).json({ message: 'Bond already processed' });
    }

    if (action === 'accept') {
      bond.status = 'accepted';
      bond.pointsGranted = pointsGranted || 10; // default points
      await bond.save();

      // Update recipient's bond points
      bond.toUser.bondPoints += bond.pointsGranted;
      bond.toUser.totalBonds += 1;
      await bond.toUser.save();

      // Notify sender that bond was accepted
      bond.fromUser.notifications.push({
        fromUser: bond.toUser._id,
        type: 'bond_granted',
        message: `${bond.toUser.username} accepted your bond request!`
      });
      await bond.fromUser.save();

      res.json({ message: 'Bond request accepted', bond });

    } else if (action === 'reject') {
      bond.status = 'rejected';
      await bond.save();

      res.json({ message: 'Bond request rejected', bond });
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================================
// Get all granted bonds for a user
// ================================
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

// ================================
// Get all incoming (pending) bond requests for a user
// ================================
router.get('/incoming/:userId', async (req, res) => {
  try {
    const bonds = await Bond.find({ toUser: req.params.userId, status: 'pending' })
      .populate('fromUser', 'username name');
    res.json(bonds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
