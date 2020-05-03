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
            Workouts: user.Workouts
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
    .post('/creategoal', (req, res) => {
        const response = planner.createGoal(req.userID, req.body.cardioMinutes, req.body.strengthMinutes, req.body.days);
        res.send(JSON.parse(JSON.stringify(response)));
    })
    .post('/submitpod', (req, res) => {
        planner.addToPlaylist(req.userID, req.body.podcast);
        res.send(JSON.parse(JSON.stringify(planner.UserPlaylists.find(x => x.UserID == req.userID))).Playlist);
    })

module.exports = router;