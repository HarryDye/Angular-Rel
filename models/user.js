var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
