const router = require('express').Router();
const { getAllThought,
        getThoughtById,
        addThought, 
        updateThought,
        removeThought,
        addReaction,
        removeReaction,
        test
} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThought)
  .post(addThought)
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)
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