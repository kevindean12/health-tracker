const express = require('express');

const exercises = require('../models/Exercises');

const router = express.Router();

router
    .get('/', (req, res) => res.send({
        Exercises: exercises.exerciseList
    }))
    .post('/addExercise', (req, res) => res.send(exercises.addExercise(req.body.newExercise)))

module.exports = router;