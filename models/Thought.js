const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'You need to enter a comment'],
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: Schema.Types.String,
            required: true,
            ref: 'User',
        },
        reactions: [Reaction.schema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

thoughtSchema.methods.addReaction = async function (reaction) {
    this.reactions.push(reaction);
    await this.save();

    return this;
};

thoughtSchema.methods.removeReaction = async function (reactionId) {
    //This will find the reactions array and filter out the reaction with given id and come back with the array without that specific reaction and save the new array
    this.reactions = this.reactions.filter(reaction => reaction._id.toString() !== reactionId);
    await this.save();
    return this;
};

//Gets the amount of reactions 
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });



const Thought = model('thought', thoughtSchema);

module.exports = Thought;