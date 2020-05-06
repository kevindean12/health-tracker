const express = require('express');

const social = require('../models/Social');
const users = require('../models/Users');

const router = express.Router();

router
    .get('/', async (req, res) => {
        try{
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
        } catch(error) {
            res.status(500).send({message: "Error retrieving social data"});
        }
        
    })
    .post('/find', async (req, res) => {
        try{
            const results = await users.FindFriend(req.body.email);
            res.send({Name: results.Name, Email: results.Email, UserID: results.UserID});
        } catch(error) {
            res.status(404).send({message: "Person not found."});
        }
        
    })
    .post('/approveFriend', async (req, res) => {
        try{
            const results = await social.approveFriend(req.userID, req.body.friendID);
            const newFriend = await users.GetUser(req.body.friendID);
            res.send({
                requests: results.requests,
                newFriend: newFriend
            });
        } catch(error) {
            res.status(500).send({message: "Error approving friend request."});
        }
        
    })
    .post('/requestFriend', async (req, res) => {
        try{
            const requests = await social.requestFriend(req.userID, req.body.friendID);
            const requestedFriend = await users.GetUser(req.body.friendID);
            res.send({
                requests: requests.requests,
                requestedFriend: requestedFriend
            });
        } catch(error) {
            res.status(500).send({message: "Error requesting friend"});
        }
        
    })
    .post('/share', async (req, res) => {
        try{
            const good = social.shareItem(req.userID, req.body.type, req.body.ID);
            res.send({message: "ok"});
        } catch(error) {
            res.status(500).send({message: "error processing share"});
        }
    })


module.exports = router;