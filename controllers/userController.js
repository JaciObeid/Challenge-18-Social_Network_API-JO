const { User, Thought } = require('../models');


module.exports = {
    //Get all Users
    async Users(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Get a User
    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No User can be found with that ID' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Create a User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Update a User
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body},
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'No User can be found with that ID' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Remove a User and Thoughts 
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No User can be found with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and their Thoughts has been deleted' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Add Friend 
    async addFriend(req, res) {
        const { userId, friendId } = req.params;
    
        try {
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'No User can be found with that ID' });
            }
    
            await user.addFriend(friendId);
            res.json({ message: 'Friend has been added' });
    
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Remove Friend
    async removeFriend(req, res) {
        const { userId, friendId } = req.params;
    
        try {
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'No User can be found with that ID' });
            }

            await user.removeFriend(friendId);
            res.json({ message: 'Friend has been deleted' });
    
        } catch (err) {
            res.status(500).json(err);
        }
    },

};



