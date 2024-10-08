const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);




const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;