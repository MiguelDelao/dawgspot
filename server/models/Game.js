const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    homeTeam: {
        required: true,
        type: String,
        trim: true
    },
    awayTeam: {
        required: true,
        type: String,
        trim: true
    },
    homeRank: {
        type: Number
    },
    awayRank: {
        type: Number
    },
    homeOdds: {
        type: Number
    },
    gameImage: {
        type: String
    }
});

module.exports = Game = mongoose.model('game', gameSchema);