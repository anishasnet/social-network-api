const router = require('express').Router();

//methods from user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/user-controller');

//set api routes for users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//set api routes for friends
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;
