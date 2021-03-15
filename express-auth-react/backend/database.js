const database = [
    {
        username: 'Cesar',
        password: '0617',
        id: 90873,
        secret: 'has a sexual fetishe'
    }
]

function findUser(username){
    return database.find(item=>item.username === username);
}

function saveUser(username, password, id, secret){
    database.push({username, password, id, secret});
    return true;
}

function findAllUsers(){
    return database;
}

module.exports = {findUser, saveUser, findAllUsers}