const { Thought, User } = require('../models');


module.exports = {
    //Get all Thoughts
    async Thoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Get a Thought
    async getThought(req, res) {
        try {
            console.log('req.params.thoughtId', req.params.thoughtId);
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No Thought can be found with that ID' });
            }
            
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body},
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'No Thought can be found with that ID' });
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Remove a thought
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No Thought can be found with that ID' });
            }

            res.json({ message: 'Thought has been deleted!' });
            
        } catch (err) {
            res.status(500).json(err);
        }
    },
//Add a Reaction to the user thought
    async addReaction(req, res) {
        try {
            const { thoughtId } = req.params;
            const reaction = req.body;
            
            const thought = await Thought.findById(thoughtId);
    
            if (!thought) {
                return res.status(404).json({ message: 'No Thought can be found with that ID' });
            }
    
            await thought.addReaction(reaction);
            res.json({ message: 'Reaction has been added!'} );
    
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Rmove a reaction from thought 
    async removeReaction(req, res) {
        const { thoughtId, reactionId } = req.params;

        try {
            const thought = await Thought.findById(thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No Thought can be found with that ID' });
            }

            await thought.removeReaction(reactionId);
            res.json({ message: 'Reaction has been removed!' });

        } catch (err) {
            res.status(500).json(err);
        }
    }
};

