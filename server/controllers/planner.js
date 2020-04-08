const express = require('express');

const exercises = require('../models/Exercises');
const planner = require('../models/Plan');

const router = express.Router();

router
    .get('/', (req, res) => res.send({
        Exercises: exercises.exerciseList
    }))
    .post('/newsession', (req, res) => res.send(planner.NewSession(req.body.userID)))
    .post('/submitWorkout', (req, res) => res.send(planner.SubmitWorkout(req.body.workout)))
    
module.exports = router;