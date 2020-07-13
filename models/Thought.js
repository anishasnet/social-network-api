const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//Reaction Schema (is a subdocument schema in Thought model)
const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        //default must be new ObjectId
        default: () => new Types.ObjectId
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
        // use moment to format timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
});

// Thought Schema
const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        // Use moment to format timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    // Array of nested documents using ReactionSchema
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

/* Counts reactions for given thought */
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})
const Thought = model('Thought', ThoughtSchema);

// export Thought model
module.exports = Thought;