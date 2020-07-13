const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThought(req,res) {
        Thought.find({})
            .select('-__v')
            .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    //Get a single thought by ID.
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
                .select('-__v')
                .then(dbThoughtData => {
                    if(!dbThoughtData) {
                        res.status(404).json({message: 'There is no thought associated with this ID.'});
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.status(400).json(err));
    }, 
    // Create a new thought associated with a user. 
    addThought({body}, res) {
        Thought.create(body)
                .then(({ _id }) => {
                    return User.findOneAndUpdate(
                        { _id: body.userId },
                        { $push: {thoughts: _id}},
                        { new: true }
                    )
                })
                .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({ message: 'There is no thought associated with this ID.'});
                        return;
                    }
                    res.json(dbUserData)
                })
                .catch(err => res.status(400).json(err));
    },
    // Update the thoughttext
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'There is no thought associated with this ID.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // Remove a thought by ID.
    removeThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'There is no thought associated with this ID.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // Add a reaction by a user to another user's thoughts.
    addReaction({params, body}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.id},
            { $push: {reactions: body}},
            { new: true, runValidators: true}
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'There is no thought associated with this ID.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
    // Remove the reaction for a thought by ID.
    removeReaction({params, body}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.id},
            { $pull: {reactions: {reactionId: params.reactionId}}},
            { new: true, runValidators: true}
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'There is no thought associated with this ID.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
    test(req, res) {
        res.json({ message: "Worked"})
    }
}
module.exports = thoughtController;