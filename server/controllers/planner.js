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
            workouts = JSON.parse(JSON.stringify(planner.UserWorkouts.find(x => x.UserID == req.userID)));
        }
        if(planner.UserPlaylists.find(x => x.UserID == req.userID)){
            playlist = JSON.parse(JSON.stringify(planner.UserPlaylists.find(x => x.UserID == req.userID))).Playlist;
        }
        res.send({
            Exercises: JSON.parse(JSON.stringify(exercises.exerciseList)),
            UserPlaylist: playlist,
            Workouts: workouts
        });
    })
    .post('/submitWorkout', (req, res) => res.send(planner.SubmitWorkout(req.body.workouts)))
    .post('/podsearch', async (req, res) => {
        const results = await planner.searchPodcasts(req.body.keywords, req.body.page);
        res.send(results);
    })
    .post('/creategoal', (req, res) => res.send(planner.createGoal(req.body.cardioMinutes, req.body.strengthMinutes, req.body.days)))
    .post('/submitpod', (req, res) => res.send(planner.addToPlaylist(req.body.userID, req.body.podcast)))

module.exports = router;