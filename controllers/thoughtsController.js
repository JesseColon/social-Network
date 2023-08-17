const { Thought } = require('../models');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this ID!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;