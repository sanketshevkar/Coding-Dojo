const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    github: {
      type: String
    },
    linkedin: {
      type: String
    },
    codechef: {
      type: String
    },
    codeforces: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);