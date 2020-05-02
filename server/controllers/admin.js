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
    .post('/addExercise', (req, res) => {
        const added = exercises.addExercise(req.body.newExercise);
        res.send({added: added});
    })
    .post('/deleteExercise', (req, res) => {
        try{
            exercises.deleteExercise(req.body.name);
            res.send({message: "ok"});
        }catch(error){
            res.status(401).send({message: error.message});
        }
    })
    .post('/editExercise', (req, res) => {
        try{
            const response = exercises.editExercise(req.body.name, req.body.updated);
            res.send({updated: response});
        }catch(error){
            res.status(401).send({message: error.message});
        }
    })

module.exports = router;