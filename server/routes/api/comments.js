const express = require('express');
const commentRouter = express.Router();
const Comment = require('../../models/Comment');

// Get List of Comments
commentRouter.get('/', (req, res) => {
    Comment.find()
        .then((comments) => res.json(comments))
        .catch((err) => res.status(404).json({ noitemfound: "No Comments Found." }))
});
// Get Specific Comment
commentRouter.get('/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then((comment) => res.json(comment))
        .catch((err) => res.status(404).json({ noitemfound: "No comment found." }))
});

// Add New Comment
commentRouter.post('/', (req, res) => {
    Comment.create(req.body)
        .then((comment) => res.json({ msg: "Comment added successfuly" }))
        .catch((err) => res.status(400).json({ error: "Unable to add comment" }))
});

// Update Specific Comment
commentRouter.put('/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
        .then((comment) => res.json({ msg: "Updated comment successfully" }))
        .catch((err) => res.status(400).json({ error: "Unable to update comment" }))
});

// Delete Specific Comment
commentRouter.delete('/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id, req.body)
        .then((comment) => res.json({ msg: "Comment deleted successfully" }))
        .catch((err) => res.status(404).json({ error: "No such comment." }))
});

module.exports = commentRouter;