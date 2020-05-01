const Users = [
    {Name: 'Kevin', Password: '2020', Email: 'kevin@notmail.com', UserID: 1},
    {Name: 'Philbert', Password: '2020', Email: 'philbert@notmail.com', UserID: 2},
    {Name: 'Soundjog', Password: '2020', Email: 'admin@soundjog.com', UserID: 0}
];

let nextID = 3;

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

function Register(name, email, password){
    if(!Users.find(x => x.Email == email)){
        Users.push({Name: name, Email: email, Password: password, UserID: nextID++});
        return true;
    }
    else{
        throw Error("Someone is already registered with that email address!");
    }
    
}

function AdminLogin(email, password){
    if(email != 'admin@soundjog.com') throw Error('Invalid credentials');
    const user = Users.find(x => x.Email == 'admin@soundjog.com');
    if(user.Password != password) throw Error('Invalid credentials');
    return CurrentUser = user;
}

module.exports = {Login, GetUser, Register, AdminLogin, FindFriend}