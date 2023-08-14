const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
  reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Schema.Types.ObjectId()
  },
  reactionBody: {
      type: String,
      required: true,
      maxlength: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  }
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema], // Array of nested documents using the reactionSchema
  },
);

// Create a virtual field called 'reactionCount' that retrieves the length of the 'reactions' array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Define a custom getter for formatting the timestamp
function dateFormat(timestamp) {
  // Format the timestamp using your preferred method (e.g., Moment.js, native Date methods)
  // For demonstration purposes, here's a simple example using native Date methods:
  return new Date(timestamp).toLocaleString();
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;