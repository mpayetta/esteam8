// Load required packages
var mongoose = require('mongoose');

// Define our User schema
var TeamSchema = new mongoose.Schema({
  name: String,
  owner: String,
  members: [  ]
});

// Export the Mongoose model
module.exports = mongoose.model('Team', TeamSchema, 'teams');