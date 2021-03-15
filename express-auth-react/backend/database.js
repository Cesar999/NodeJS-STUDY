const database = [
    {
        username: 'Cesar',
        password: '0617',
        id: 90873
    }
]

function findUser(username){
    return database.find(item=>item.username === username);
}

function saveUser(username, password, id){
    database.push({username, password, id});
    return true;
}

function findAllUsers(){
    return database;
}

module.exports = {findUser, saveUser, findAllUsers}