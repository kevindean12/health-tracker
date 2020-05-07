const express = require('express');

const exercises = require('../models/Exercises');
const planner = require('../models/Plan');

const router = express.Router();

router
    .get('/', async (req, res) => {
        console.log({userID: req.userID});
        try{
            const user = await planner.getFullUser(req.userID);
            const exerciseList = await exercises.getAllExercises();
            res.send({
                Exercises: exerciseList,
                UserPlaylist: user.Playlist,
                Workouts: user.Workouts,
                Goals: user.Goal
            });
        } catch(error) {
            res.status(404).send({message: "Error fetching user and exercise information."});
        }
        
        
    })
    .post('/submitWorkout', async (req, res) => {
        try{
            const user = await planner.SubmitWorkout(req.userID, req.body.workout);
            console.log("user workouts after adding: ", user.Workouts);
            res.send(user.Workouts);
        } catch(error) {
            res.status(500).send({message: "Workout could not be processed"});
        }
        
    })
    .post('/podsearch', async (req, res) => {
        try{
            const results = await planner.searchPodcasts(req.body.keywords, req.body.page);
            res.send(results.data.results);
        } catch(error) {
            res.status(404).send({message: "Podcast search returned no results."});
        }
        
    })
    .post('/creategoal', async (req, res) => {
        try{
            const user = await planner.createGoal(req.userID, req.body.cardioMinutes, req.body.strengthMinutes, req.body.days);
            res.send({goals: user.Goal});
        } catch(error) {
            res.status(500).send({message: "Goal couldn't be processed."});
        }
        
    })
    .post('/submitpod', async (req, res) => {
        try{
            const user = await planner.addToPlaylist(req.userID, req.body.podcast);
            res.send(user.Playlist);
        } catch(error) {
            res.status(500).send({message: "Podcast could not be added."});
        }
        
    })

module.exports = router;