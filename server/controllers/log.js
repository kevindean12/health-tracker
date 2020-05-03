const express = require('express');

const planner = require('../models/Plan');

const router = express.Router();

router
    .post('/updateExercise', async (req, res) => {
        const response = await planner.exerciseProgress(req.userID, req.body.GID, req.body.workoutID, req.body.exerciseIndex, req.body.minutesCompleted);
        const user = await planner.getFullUser(req.userID);
        res.send({
            workouts: user.Workouts,
            progress: response
        });
    })

module.exports = router