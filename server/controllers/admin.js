const express = require('express');

const exercises = require('../models/Exercises');
const users = require('../models/Users');

const router = express.Router();

router
    .get('/', (req, res) => res.send({
        Exercises: exercises.exerciseList
    }))
    .post('/login', async (req, res) => {
        try{
            const user = await users.AdminLogin(req.body.email, req.body.password);
            res.send(user);
        } catch(error){
            res.status(401).send({message: error.message});
        }
    })
    .post('/addExercise', async (req, res) => {
        try{
            const added = await exercises.addExercise(req.body.newExercise);
            res.send({added: {
                name: added.name,
                description: added.description,
                category: added.category,
                time: added.time
            }});
        } catch(error) {
            res.status(500).send({message: "Error processing exercise."});
        }
        
    })
    .post('/deleteExercise', async (req, res) => {
        try{
            const response = await exercises.deleteExercise(req.body.name);
            res.send({message: response.ok});
        }catch(error){
            res.status(401).send({message: error.message});
        }
    })
    .post('/editExercise', async (req, res) => {
        try{
            const response = await exercises.editExercise(req.body.name, req.body.updated);
            res.send({updated: {
                name: response.name,
                description: response.description,
                category: response.category,
                time: response.time
            }});
        }catch(error){
            res.status(401).send({message: error.message});
        }
    })

module.exports = router;