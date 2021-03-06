import sjFetch from './sjFetch';

export let CurrentUser = null;

export async function Login(email, password){
    if(!email){
        throw Error('Missing email address.');
    }
    const user = await sjFetch('/users/login', {email, password});
    return CurrentUser = user;
}

export async function AdminLogin(email, password){
    const user = await sjFetch('/admin/login', {email, password});
    return CurrentUser = user;
}

export async function Register(name, email, password, confirmation){
    if(!password || !email || !name){
        throw Error('Please provide a name, email, and password');
    }
    if(password != confirmation) {
        throw Error('Passwords do not match!');
    }
    const success = await sjFetch('/users/register', {name: name, email: email, password: password});
    return success;
}

export function Logout(){
    this.$router.push('/login');
    return CurrentUser = null;
}

export async function ChangeName(name){
    const response = await sjFetch('/users/changeName', {name: name});
    return response;
}

export async function ChangePassword(oldPassword, newPassword, confirmNew){
    const response = await sjFetch('/users/changePassword', {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNew: confirmNew
    });
    return response;
}