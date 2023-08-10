const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      max_length: 50,
    },
    thoughts: [Thoughtschema._id],
    friends: [Friendschema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
