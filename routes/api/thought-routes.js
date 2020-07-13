const router = require('express').Router();

// methods from thought-controller
const { getAllThought,
        getThoughtById,
        addThought, 
        updateThought,
        removeThought,
        addReaction,
        removeReaction,
        test
} = require('../../controllers/thought-controller');

//setting api routes for thoughts
router
  .route('/')
  .get(getAllThought)
  .post(addThought)
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)
// setting api routes for reactions
router
    .route('/:id/reactions')
    .post(addReaction)
router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction);
router
    .route('/test')
    .get(test)
module.exports = router;