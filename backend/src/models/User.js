const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    bio: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    specialization: {
      type: String,
      default: 'Full Stack Engineering',
    },
    primaryLang: {
      type: String,
      default: 'JavaScript',
    },
    yearsExp: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    badges: {
      type: [String],
      default: [],
    },
    avatar: {
      type: String,
      default: '',
    },
    preferences: {
      publicVisibility: { type: Boolean, default: true },
      weeklyDigest: { type: Boolean, default: false },
      experiencePoints: { type: Boolean, default: true },
    },
    stats: {
      streak: { type: Number, default: 1 },
      timeOnCraft: { type: Number, default: 0 },
      successRate: { type: Number, default: 100 },
      complexity: { type: String, default: 'O(n)' },
      competencies: {
        frontend: { type: Number, default: 80 },
        backend: { type: Number, default: 60 },
        optimization: { type: Number, default: 90 },
      },
      contributionPulse: {
        type: [Number],
        default: [0, 1, 2, 0, 3, 4, 1, 0, 0, 2, 3, 1], // default mock array so it's not empty for new users
      },
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
