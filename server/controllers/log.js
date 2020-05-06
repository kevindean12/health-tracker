const express = require('express');

const planner = require('../models/Plan');

const router = express.Router();

router
    .post('/updateExercise', async (req, res) => {
        try{
            const response = await planner.exerciseProgress(req.userID, req.body.GID, req.body.workoutID, req.body.exerciseIndex, req.body.minutesCompleted);
            const user = await planner.getFullUser(req.userID);
            if(response){
                res.send({
                    workouts: user.Workouts,
                    progress: response
                });
            } 
            else {
                throw Error("An error occurred while trying to process the exercise progress.");
            }
            
        } catch(error) {
            res.status(500).send({message: error.message});
        }
        
    })

module.exports = router