const router = require('express').Router();

const {
    Thoughts,
    getThought,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(Thoughts).post(createThought);

router.route('/:thoughtId').get(getThought).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;