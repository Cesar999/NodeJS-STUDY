const url = 'http://localhost:3002';

async function loginPost(username, password){
    const response = await fetch(url+'/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        });
    return response.json();
}

async function registerPost(username, password, passwordConfirm){
    const response = await fetch(url+'/register', {
        method: 'POST',
        body: JSON.stringify({username, password, passwordConfirm}),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return response.json();
}

async function authenticateGet() {
    const response = await fetch(url+'/authenticate', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return response.json();
}

async function logoutGet(){
    const response = await fetch(url+'/logout', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        });
    return response.json();
}

async function getAllUsers() {
    const response = await fetch(url+'/getAllUsers', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    return response.json();
}

export { loginPost, registerPost, authenticateGet, logoutGet, getAllUsers }