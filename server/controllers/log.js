const express = require('express');

const exercises = require('../models/Exercises');

const router = express.Router();

router
    .get('/exercises', (req, res) => res.send(exercises))
    .post('/exercises', (req, res) => {
        exercises.addExercise(req.query.name, req.query.description, req.query.category, req.query.time);
        res.send(exercises.exerciseList[exercises.exerciseList.length - 1]);
    })

module.exports = router