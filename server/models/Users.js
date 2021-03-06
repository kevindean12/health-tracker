const mongoose = require('mongoose');
const axios = require('axios').default;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const ExerciseSchema = new mongoose.Schema({
    name: {type: String},
    category: {type: String},
    description: {type: String},
    time: {type: Number}
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

const PodcastSchema = new mongoose.Schema({
    title: {
        type: String
    },
    episodeTitle: {
        type: String
    },
    duration: {
        type: Number
    },
    audio: {
        type: String
    },
    coverArt: {
        type: String
    }
});

const WorkoutSchema = new mongoose.Schema({
    WID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    Exercises: [ExerciseSchema],
    Podcasts: [PodcastSchema],
    Shared: [{type: Number}]
}, {timestamps: true});

const GoalSchema = new mongoose.Schema({
    GID: {
        type: mongoose.Schema.Types.ObjectId
    },
    Cardio: {
        Amount: {type: Number},
        Remaining: {type: Number}
    },
    Strength: {
        Amount: {type: Number},
        Remaining: {type: Number}
    },
    Days: {
        type: Number
    },
    Shared: [{type: Number}]
}, {timestamps: true});

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
    },
    Email: {
        type: String,
        required: true
    },
    UserID: {
        type: Number,
        required: true
    },
    Workouts: [WorkoutSchema],
    Playlist: [PodcastSchema],
    Goal: [GoalSchema],
    Completed: {
        Goals: [GoalSchema],
        Exercises: [ExerciseSchema]
    },
    FriendRequests: [{type: Number}],
    Friends: [{type: Number}]
});

UserSchema.index({Name: 'text'})

const User = mongoose.model('User', UserSchema);

async function Login(email, password){
    if(email == "google"){
        const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", { headers: { Authorization: `Bearer ${password}` } });
        return RegisterOrLogin(response);
    }
    const user = await User.findOne({"Email": email});
    const good = await bcrypt.compare(password, user.Password);
    if(!good) throw Error('Invalid credentials');
    return user;
}

async function RegisterOrLogin(response){
    let user = await User.findOne({Email: response.data.email});
    if(!user){
        let uid = await User.countDocuments({});
        uid++;
        const newUser = new User({
            Name: response.data.name,
            Password: null,
            Email: response.data.email,
            UserID: uid
        })
        user = await newUser.save();
    }
    return user;
}

async function GetUser(userID){
    const user = await User.findOne({UserID: userID});
    return {Name: user.Name, Email: user.Email, UserID: user.UserID};
}

async function FindFriend(email){
    try{
        const friend = await User.findOne({Email: email});
        return {Name: friend.Name, Email: friend.Email, UserID: friend.UserID};
    } catch(error) {
        console.error(error);
    }
    
}

async function FindFriendsByName(partname){
    try{
        console.log(partname);

        const re = new RegExp("^" + partname);
        const friends = await User.find({Name: re});
        const out = [];
        friends.forEach(x => out.push({Name: x.Name, Email: x.Email, UserID: x.UserID}));
        console.log("friends results: ", friends);
        return {friends: out};
    } catch(error) {
        console.error(error);
    }
}


async function Register(name, email, password){
    const checkUser = await User.findOne({"Email": email});
    if(!checkUser){
        let uid = await User.countDocuments({});
        uid++;
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = new User({
            Name: name,
            Email: email,
            Password: hashed,
            UserID: uid
        });
        return await newUser.save();
    }
    else throw Error("There is already an account with that email address. Please use Login page to login.");
    
}

async function AdminLogin(email, password){
    if(email != 'admin@soundjog.com') throw Error('Invalid credentials');
    const user = await User.findOne({Email: "admin@soundjog.com"});
    const good = await bcrypt.compare(password, user.Password);
    if(!good) throw Error('Invalid credentials');
    return {Name: user.Name, Email: user.Email, UserID: user.UserID};
}

async function ChangeName(userID, name){
    const user = await User.findOne({UserID: userID});
    if(user){
        user.Name = name;
        return await user.save();
    }
    else {
        throw Error("User not found");
    }
}

async function ChangePassword(userID, oldPassword, newPassword, confirmNew){
    const user = await User.findOne({UserID: userID});
    if(user){
        if(newPassword != confirmNew) throw Error("Passwords don't match.");
        if(!user.Password) throw Error("You don't need a password because you're signed in with Google!");
        const good = await bcrypt.compare(oldPassword, user.Password);
        if(!good) throw Error("Invalid current password");
        const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
        user.Password = hashed;
        return await user.save();
    }
    else throw Error("User not found");
}

module.exports = {Login, GetUser, Register, AdminLogin, FindFriend, ChangeName, ChangePassword, User, Exercise, FindFriendsByName}