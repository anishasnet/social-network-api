const { Schema, model } = require('mongoose');
const moment = require('moment');

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
    match: [/^([a-z0-9_\.-]+)@([a-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address!']
},
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
    ],
    friends: [UserSchema]
},
{
    toJSON: {
        virtuals: true
},
    id: false
});