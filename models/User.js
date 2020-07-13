const { Schema, model } = require('mongoose');
const moment = require('moment');

//User Schema
const UserSchema = new Schema({
    username: {
    type: String,
    unique: true,
    required: true,
    trim: true
},
    email: {
    type: String,
    unique: true, 
    required: true,
    //email validation
    match: [/^([a-z0-9_\.-]+)@([a-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address.']
},
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
},
    id: false
});

/* Counts total friends */
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

// export User model
module.exports = User;