const express = require('express');
const Task = require('../models/models');
const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const docs = await Task.find();
        res.json(docs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving tasks');
    }
});

// POST a new task
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    try {
        const doc = await task.save();
        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving task');
    }
});

// PUT to update a task
router.put('/:id', async (req, res) => {
    try {
        const doc = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating task');
    }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
    try {
        const doc = await Task.findByIdAndDelete(req.params.id);
        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting task');
    }
});

module.exports = router;
