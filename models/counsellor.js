const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const counsellorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    encrypted_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 1,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Counsellor', counsellorSchema);
