// Load required packages
var mongoose = require('mongoose');

// Define our User schema
var UserSchema = new mongoose.Schema({
  name: String,
  fname: String,
  lname: String,
  email: String,
  pass: String,
  authToken: String,
  teams: [  ]
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema, 'users');