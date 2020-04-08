const express = require('express');

const plan = require('../models/Plan');
const log = require('../models/Log');

const router = express.Router();

router
    .get('/exercises', (req, res) => res.send(plan.MyWorkouts))
    .post('/updateExercise', (req, res) => {
        log.UpdateProgress(req.body.workoutID, req.body.timeCompleted);
        res.send(plan.MyWorkouts);
    })

module.exports = router