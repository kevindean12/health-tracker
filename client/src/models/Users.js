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

export async function Register(name, email, password, confirmation){
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