const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to the Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (self-reference)
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual field called 'friendCount' that retrieves the length of the 'friends' array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const Users = model('User', userSchema);

module.exports = { Users };