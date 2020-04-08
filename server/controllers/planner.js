const express = require('express');

const exercises = require('../models/Exercises');
const planner = require('../models/Plan');

const router = express.Router();

router
    .get('/', (req, res) => res.send({
        Exercises: exercises.exerciseList
    }))
    
module.exports = router;