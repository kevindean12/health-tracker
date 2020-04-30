const express = require('express');

const planner = require('../models/Plan');

const router = express.Router();

router
    .get('/exercises', (req, res) => res.send(plan.MyWorkouts))
    .post('/updateExercise', (req, res) => {
        const response = planner.exerciseProgress(req.userID, req.body.workoutIndex, req.body.exerciseIndex, req.body.minutesCompleted);
        res.send({
            workouts: JSON.parse(JSON.stringify(planner.UserWorkouts.filter(x => x.UserID == req.userID))),
            progress: JSON.parse(JSON.stringify(response))
        });
    })

module.exports = router