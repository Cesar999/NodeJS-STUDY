const database = [
    {
        text: 'Upper Body Push Workout',
        id: '7e8317d4-ba09-4cdf-9176-2f417d05edae',
        date: 'March 13th 2021, 1:49:35 pm',
        done: false
    }
];

function getData(){
    return database;
}

function postData(newTodo){
    database.push(newTodo);
    return true;
}

function deleteData(id){
    const todo = database.find(item=>item.id===id);
    const index = database.indexOf(todo);
    database.splice(index, 1);
    return true;
}

function patchData(id){
    const todo = database.find(item=>item.id===id);
    const index = database.indexOf(todo);
    database[index].done = !database[index].done;
    return true;
}

module.exports = {getData, postData, deleteData, patchData}
