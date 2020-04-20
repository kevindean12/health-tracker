import sjFetch from './sjFetch';

export let CurrentUser = null;

export async function Login(email, password){
    const user = await sjFetch('/users/login', {email, password});
    return CurrentUser = user;
}

export async function AdminLogin(email, password){
    const user = await sjFetch('/admin/login', {email, password});
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