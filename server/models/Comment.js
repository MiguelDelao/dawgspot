const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    content: {
        required: true,
        type: String,
        trim: true,
    },
    game: {
        required: true,
        type: String,
    }
});

module.exports = Comment = mongoose.model('comment', commentSchema);