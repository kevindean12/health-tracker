const express = require('express');

const exercises = require('../models/Exercises');
const planner = require('../models/Plan');

const router = express.Router();

router
    .get('/', (req, res) => {
        console.log({userID: req.userID});
        res.send({
            Exercises: exercises.exerciseList,
            UserPlaylist: planner.UserPlaylists,
            Workouts: planner.UserWorkouts
        });
    })
    .post('/newsession', (req, res) => res.send(planner.NewSession(req.body.userID)))
    .post('/submitWorkout', (req, res) => res.send(planner.SubmitWorkout(req.body.workouts)))
    .post('/podsearch', async (req, res) => {
        const results = await planner.searchPodcasts(req.body.keywords, req.body.page);
        res.send(results);
    })
    .post('/creategoal', (req, res) => res.send(planner.createGoal(req.body.cardioMinutes, req.body.strengthMinutes, req.body.days)))
    .post('/submitpod', (req, res) => res.send(planner.addToPlaylist(req.body.userID, req.body.podcast)))

module.exports = router;