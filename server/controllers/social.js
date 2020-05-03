const express = require('express');

const social = require('../models/Social');
const users = require('../models/Users');

const router = express.Router();

router
    .get('/', async (req, res) => {
        const friendRequests = await social.getFriendRequests(req.userID);
        const sharedObjects = await social.getShared(req.userID);
        const friends = await social.getAllFriends(req.userID);
        console.log("shared objects: ", sharedObjects);
        console.log("friends: ", friends);
        res.send({
            requests: friendRequests.requests,
            shared: sharedObjects,
            friends: friends
        });
    })
    .post('/find', async (req, res) => {
        const results = await users.FindFriend(req.body.email);
        res.send({Name: results.Name, Email: results.Email, UserID: results.UserID});
    })
    .post('/approveFriend', async (req, res) => {
        const results = await social.approveFriend(req.userID, req.body.friendID);
        const newFriend = await users.GetUser(req.body.friendID);
        res.send({
            requests: results.requests,
            newFriend: newFriend
        });
    })
    .post('/requestFriend', async (req, res) => {
        const requests = await social.requestFriend(req.userID, req.body.friendID);
        const requestedFriend = await users.GetUser(req.body.friendID);
        res.send({
            requests: requests.requests,
            requestedFriend: requestedFriend
        });
    })
    .post('/share', async (req, res) => {
        const good = social.shareItem(req.userID, req.body.type, req.body.ID);
        if(good){
            res.status(200).send({message: "ok"});
        }
        else{
            res.status(500).send({message: "error processing share"});
        }
    })


module.exports = router;