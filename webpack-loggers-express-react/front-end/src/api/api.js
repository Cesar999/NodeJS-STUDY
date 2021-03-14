async function getTodos(){
    const response = await fetch(`http://localhost:3002/getTodos`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
        'Content-Type': 'application/json'
        }
    })
    return response.json();
}

async function postTodo(newTodo){
    const response = await fetch(`http://localhost:3002/postTodo`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    })
    return response.json();
}

async function deleteTodo(id){
    const response = await fetch(`http://localhost:3002/deleteTodo/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
        'Content-Type': 'application/json'
        }
    })
    return response.json();
}

async function patchTodo(id){
    const response = await fetch(`http://localhost:3002/patchTodo/${id}`, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
        'Content-Type': 'application/json'
        }
    })
    return response.json();
}

export { getTodos, postTodo, deleteTodo, patchTodo };
