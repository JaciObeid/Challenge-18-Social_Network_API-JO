const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: [true, 'You need to have an unique Username'],
            required: [true, 'You need a Username to create a user'],
            trim: true,
        },
        email: {
            type: String,
            unique: [true, 'You need to have a unique email'],
            required: [true, 'You need to enter a email for the user'],
            //This is what i found for email validation(found on https://saturncloud.io/blog/how-can-i-validate-an-email-address-using-a-regular-expression/)
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
  


userSchema.methods.addFriend = async function (friendId) {
    //makes sure that you can only add a specific user once to your friends
    if (!this.friends.includes(friendId)) {
        this.friends.push(friendId);
        await this.save();

        return this;
    }
};

userSchema.methods.removeFriend = async function (friendId) {
    //finds the if of the friends and gives back a filtered list of friends without that id
    if (this.friends.includes(friendId)) {
        this.friends = this.friends.filter(id => !id.equals(friendId));

        await this.save();
    }
    return this;
};

userSchema.virtual('friendCount').get(function(){
// Just gets the amount of friend Ids that a user has
    return this.friends.length;
});



const User = model('user', userSchema);

module.exports = User;