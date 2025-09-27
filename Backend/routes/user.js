const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('notifications.fromUser', 'username name');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      username: user.username,
      name: user.name,
      email: user.email,
      bondPoints: user.bondPoints,
      totalBonds: user.totalBonds,
      notifications: user.notifications
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark notification as read
router.post('/notifications/read', async (req, res) => {
  try {
    const { userId, notificationId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const notification = user.notifications.id(notificationId);
    if (notification) {
      notification.read = true;
      await user.save();
    }
    res.json({ message: 'Notification marked as read', notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
