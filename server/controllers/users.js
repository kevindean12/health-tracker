const express = require('express');

const users = require('../models/Users');

const router = express.Router();

router
    .post('/login', async (req, res) => {
        try {
            const user = await users.Login(req.body.email, req.body.password);
            res.send({
                Name: user.Name,
                Email: user.Email,
                UserID: user.UserID
            });
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })
    .post('/register', async (req, res) => {
        try {
            const nUser = await users.Register(req.body.name, req.body.email, req.body.password);
            console.log("the new user is", nUser);
            res.status(200).send({message: true});
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    })
    .post('/changeName', async (req, res) => {
        try {
            const name = await users.ChangeName(req.userID, req.body.name);
            res.send({updated: name.Name});
        } catch(error){
            res.status(401).send({message: error.message});
        }
    })
    .post('/changePassword', async (req, res) => {
        try {
            await users.ChangePassword(req.userID, req.body.oldPassword, req.body.newPassword, req.body.confirmNew);
            res.send({updated: true});
        } catch(error){
            res.status(401).send({message: error.message});
        }
    })

module.exports = router;