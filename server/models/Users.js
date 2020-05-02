const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    UserID: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

async function Login(email, password){
    //const user = Users.find(x => x.Email == email);
    const user = await User.findOne({"Email": email, "Password": password});
    if(!user) throw Error('Invalid credentials');
    return user;
}

async function GetUser(userID){
    const user = await User.findOne({UserID: userID});
    return {Name: user.Name, Email: user.Email, UserID: user.UserID};
}

async function FindFriend(email){
    const friend = await User.findOne({Email: email});
    return {Name: user.Name, Email: user.Email, UserID: user.UserID};
}


async function Register(name, email, password){
    const checkUser = await User.findOne({"Email": email});
    if(!checkUser){
        let uid = Math.floor(Math.random()*10000 + 1);
        let uniqueID = await User.findOne({UserID: uid});
        while(uniqueID != null){
            uid++;
            uniqueID = await User.findOne({UserID: uid});
        }
        const newUser = new User({
            Name: name,
            Email: email,
            Password: password,
            UserID: uid
        });
        return await newUser.save();
    }
    else throw Error("Someone is already registered with that email address!");
    
}

async function AdminLogin(email, password){
    if(email != 'admin@soundjog.com') throw Error('Invalid credentials');
    const user = await User.findOne({Email: "admin@soundjog.com"});
    if(user.Password != password) throw Error('Invalid credentials');
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

async function ChangePassword(userID, password){
    const user = await User.findOne({UserID: userID});
    if(user){
        user.Password = password;
        return await user.save();
    }
    else throw Error("User not found");
}

module.exports = {Login, GetUser, Register, AdminLogin, FindFriend, ChangeName, ChangePassword}