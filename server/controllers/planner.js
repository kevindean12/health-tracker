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
    .post('/podsearch', async (req, res) => {
        const results = await planner.searchPodcasts(req.body.keywords, req.body.page);
        console.log(results);
        res.send(results);
    })
    
module.exports = router;