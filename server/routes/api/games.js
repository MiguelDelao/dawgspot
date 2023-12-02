const express = require('express');
const gameRouter = express.Router();
const Game = require('../../models/Game');

// get list of Games
gameRouter.get('/',(req, res) => {
    Game.find()
        .then((games) => res.json(games))
        .catch((err) => res.status(404).json({ noitemfound: "No Games found" }));
});

// get specific Game
gameRouter.get('/:id',(req, res) => {
    Game.findById(req.params.id)
        .then((game) => res.json(game))
        .catch((err) => res.status(404).json({ noitemfound: "No Game found" }));
});

// add new Game
gameRouter.post('/', (req, res) => {
    Game.create(req.body)
        .then((game) => res.json({ msg: 'Game added successfully' }))
        .catch((err) => res.status(400).json({ error: 'Unable to add this Game' }));
});

// update specific Game
gameRouter.put('/:id',(req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body)
        .then((game) => res.json({ msg: "Updated successfully" }))
        .catch((err) => res.status(400).json({ error: "Unable to update DB" }));
});

// delete specific Game
gameRouter.delete('/:id',(req, res) => {
    Game.findByIdAndDelete(req.params.id)
        .then((game) => res.json({ msg: "Game deleted successfully" }))
        .catch((err) => res.status(404).json({ error: "No such Game" }));
});

module.exports = gameRouter;