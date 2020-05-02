const express = require('express');

const exercises = require('../models/Exercises');
const planner = require('../models/Plan');

const router = express.Router();

router
    .get('/', (req, res) => {
        console.log({userID: req.userID});
        let playlist = [];
        let workouts = [];
        if(planner.UserWorkouts.find(x => x.UserID == req.userID)){
            workouts = planner.UserWorkouts.filter(x => x.UserID == req.userID);
        }
        if(planner.UserPlaylists.find(x => x.UserID == req.userID)){
            playlist = planner.UserPlaylists.find(x => x.UserID == req.userID).Playlist;
        }
        res.send({
            Exercises: exercises.exerciseList,
            UserPlaylist: playlist,
            Workouts: workouts
        });
    })
    .post('/submitWorkout', (req, res) => {
        planner.SubmitWorkout(req.userID, req.body.workout);
        res.send(JSON.parse(JSON.stringify(planner.UserWorkouts.filter(x => x.UserID == req.userID))));
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