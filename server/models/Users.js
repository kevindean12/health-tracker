const Users = [
    {Name: 'Kevin', Password: '2020', Email: 'kevin@notmail.com', UserID: 1},
    {Name: 'Philbert', Password: '2020', Email: 'philbert@notmail.com', UserID: 2},
    {Name: 'Soundjog', Password: '2020', Email: 'admin@soundjog.com', UserID: 0}
];

function Login(email, password){
    const user = Users.find(x => x.Email == email);
    if(!user) throw Error('Invalid email');
    if(user.Password != password) throw Error('Invalid password');
    return user;
}

function GetUser(userID){
    const user = Users.find(x => x.UserID == userID);
    return {...user, Password: undefined};
}

function FindFriend(email){
    const friend = Users.find(x => x.Email == email);
    return {...friend, Password: undefined};
}

function Register(email, password, confirmation){
    if(password != confirmation) {
        throw Error('Passwords do not match!');
    }
    // if(password.length < 12){
    //     throw Error('Password is too short');
    // } //implement this in deployment
    Users.push({Email: email, Password: password});
}

function AdminLogin(email, password){
    if(email != 'admin@soundjog.com') throw Error('Invalid credentials');
    const user = Users.find(x => x.Email == 'admin@soundjog.com');
    if(user.Password != password) throw Error('Invalid credentials');
    return CurrentUser = user;
}

module.exports = {Login, GetUser, Register, AdminLogin, FindFriend}