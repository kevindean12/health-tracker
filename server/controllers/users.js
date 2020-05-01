const express = require('express');

const users = require('../models/Users');

const router = express.Router();

router
    .post('/login', (req, res) => {
        try {
            const user = users.Login(req.body.email, req.body.password);
            res.send({...user, Password: undefined});
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })
    .post('/register', (req, res) => {
        try {
            const success = users.Register(req.body.name, req.body.email, req.body.password);
            res.status(200).send({message: true});
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    })

module.exports = router;