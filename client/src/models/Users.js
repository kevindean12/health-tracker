export const Users = [
    {Email: 'kevin@notmail.com', Password: '2020'},
    {Email: 'admin@soundjog.com', Password: 'admin'}
];

export let CurrentUser = null;

export function Login(email, password){
    const user = Users.find(x => x.Email == email);
    if(!user) throw Error('Invalid credentials');
    if(user.Password != password) throw Error('Invalid credentials');

    return CurrentUser = user;
}

export function AdminLogin(email, password){
    if(email != 'admin@soundjog.com') throw Error('Invalid credentials');
    const user = Users.find(x => x.Email == 'admin@soundjog.com');
    if(user.Password != password) throw Error('Invalid credentials');
    return CurrentUser = user;
}

export function Register(email, password, confirmation){
    if(password != confirmation) {
        throw Error('Passwords do not match!');
    }
    // if(password.length < 12){
    //     throw Error('Password is too short');
    // } //implement this in deployment
    Users.push({Email: email, Password: password});
}