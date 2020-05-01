const express = require('express');

const social = require('../models/Social');
const users = require('../models/Users');

const router = express.Router();

router
    .get('/', (req, res) => {
        const friendRequests = social.getFriendRequests(req.userID);
        const sharedObjects = social.getShared(req.userID);
        const friends = social.getAllFriends(req.userID);
        console.log("shared objects: ", sharedObjects);
        res.send({
            requests: friendRequests.requests,
            shared: sharedObjects,
            friends: friends
        });
    })
    .post('/find', (req, res) => {
        const results = users.FindFriend(req.body.email);
        res.send({name: results.Name, email: results.Email, userID: results.UserID});
    })
    .post('/approveFriend', (req, res) => {
        const results = social.approveFriend(req.userID, req.body.friendID);
        const newFriend = social.getFriend(req.userID, req.body.friendID);
        res.send({
            requests: results.requests,
            newFriend: newFriend.friend
        });
    })
    .post('/requestFriend', (req, res) =>{
        const results = social.requestFriend(req.userID, req.body.friendID);
        const requestedFriend = users.GetUser(req.body.friendID);
        res.send({
            requests: results.requests,
            requestedFriend: requestedFriend
        });
    })
    .post('/share', (req, res) => {
        const good = social.shareItem(req.userID, req.body.type, req.body.ID);
        if(good){
            res.status(200).send({message: "ok"});
        }
        else{
            res.status(500).send({message: "error processing share"});
        }
    })


module.exports = router;