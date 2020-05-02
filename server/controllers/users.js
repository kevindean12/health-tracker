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
    .post('/changeName', (req, res) => {
        try {
            const name = users.ChangeName(req.userID, req.body.name);
            res.send({updated: name});
        } catch(error){
            res.status(401).send({message: error.message});
        }
    })
    .post('/changePassword', (req, res) => {
        try {
            users.ChangePassword(req.userID, req.body.password);
            res.send({updated: true});
        } catch(error){
            res.status(401).send({message: error.message});
        }
    })

module.exports = router;