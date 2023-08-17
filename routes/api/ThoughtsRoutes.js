const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtsController');

router
  .route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router
  .route('/:thoughtId/reactions')
  .post(thoughtController.addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction);

module.exports = router;