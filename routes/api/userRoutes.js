const router = require('express').Router();

const {
    Users,
    getUser,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(Users).post(createUser);

router.route('/:userId').get(getUser).put(updateUser).delete(removeUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;