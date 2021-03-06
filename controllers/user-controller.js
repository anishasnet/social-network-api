const { User } = require('../models');

const userController = {
    // Get all users
    getAllUsers(req,res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Get a single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts', 
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is no user associated with this id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Create a new user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // Update a user's username
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.id}, 
            body, 
            { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'There is no user associated with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // Delete a user by ID
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'There is no user associated with this id.'})
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));

    },
    // Add a single friend to a user.
    addFriend({params}, res) {
        User.findByIdAndUpdate(
            { _id: params.id}, 
            { $push: {friends: params.friendId}},
            { new: true, runValidators: true}
        )
            .populate({
                path: 'friends',
                select: '_id'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'There is no user associated with this ID.'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },
    // Remove a user's friend
    removeFriend({params}, res) {
        User.findByIdAndUpdate(
            { _id: params.id}, 
            { $pull: {friends: params.friendId}},
            { new: true, runValidators: true}
        )
            .populate({
                path: 'friends',
                select: '_id'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'There is no user associated with this ID.'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
}
module.exports = userController;

