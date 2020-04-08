const Users = [
    {Name: 'Kevin', Password: '2020', Email: 'k@notmail.com', UserID: 1},
    {Name: 'Philbert', Password: '2020', Email: 'p@notmail.com', UserID: 2}
];

function Login(email, password){
    const user = Users.find(x => x.Email == email);
    if(!user) throw Error('Invalid credentials');
    if(user.Password != password) throw Error('Invalid credentials');
    return user;
}

function GetUser(userID){
    return Users.find(x => x.UserID == userID);
}

module.exports = {Login, GetUser}