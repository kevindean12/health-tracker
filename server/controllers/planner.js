const express = require('express');

const exercises = require('../models/Exercises');
const planner = require('../models/Plan');

const router = express.Router();

router
    .get('/', async (req, res) => {
        console.log({userID: req.userID});
        const user = await planner.getFullUser(req.userID);
        const exerciseList = await exercises.getAllExercises();
        res.send({
            Exercises: exerciseList,
            UserPlaylist: user.Playlist,
            Workouts: user.Workouts,
            Goals: user.Goal
        });
    })
    .post('/submitWorkout', async (req, res) => {
        const user = await planner.SubmitWorkout(req.userID, req.body.workout);
        console.log("user workouts after adding: ", user.Workouts);
        res.send(user.Workouts);
    })
    .post('/podsearch', async (req, res) => {
        const results = await planner.searchPodcasts(req.body.keywords, req.body.page);
        res.send(results);
    })
    .post('/creategoal', async (req, res) => {
        const user = await planner.createGoal(req.userID, req.body.cardioMinutes, req.body.strengthMinutes, req.body.days);
        res.send({goals: user.Goal});
    })
    .post('/submitpod', async (req, res) => {
        const user = await planner.addToPlaylist(req.userID, req.body.podcast);
        res.send(user.Playlist);
    })

module.exports = router;