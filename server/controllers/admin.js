const express = require('express');

const exercises = require('../models/Exercises');
const users = require('../models/Users');

const router = express.Router();

router
    .get('/', (req, res) => res.send({
        Exercises: exercises.exerciseList
    }))
    .post('/login', (req, res) => {
        try{
            const user = users.AdminLogin(req.body.email, req.body.password);
            res.send({...user, Password: undefined});
        } catch(error){
            res.status(401).send({message: error.message});
        }
    })
    .post('/addExercise', (req, res) => res.send(exercises.addExercise(req.body.newExercise)))

module.exports = router;