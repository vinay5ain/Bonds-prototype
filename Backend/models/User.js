const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed password
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  bondPoints: { type: Number, default: 0 },
  totalBonds: { type: Number, default: 0 },
  notifications: [
    {
      fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      type: { type: String }, // bond_request, bond_granted
      message: { type: String },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
