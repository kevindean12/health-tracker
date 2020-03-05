const Users = [
    {Name: 'Kevin', Password: '2020', Email: 'kevin@notmail.com'},
    {Name: 'Admin', Password: 'admin', Email: 'admin@soundjog.com'}
];

export let CurrentUser = null;

export function Login(email, password){
    const user = Users.find(x => x.Email == email);
    if(!user) throw Error('Invalid credentials');
    if(user.Password != password) throw Error('Invalid credentials');

    return CurrentUser = user;
}