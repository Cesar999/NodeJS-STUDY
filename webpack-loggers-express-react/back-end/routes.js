const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const {getData, postData, deleteData, patchData} = require('./database.js');
const {LogInfo} = require('./winston.js');

const info = LogInfo('routes');

function getTodos(req, res){
    info(`${req.method} - ${JSON.stringify(req.body)} - ${req.originalUrl}`);
    const todos = getData();
    res.send({todos});
}

function postTodo(req, res){
    info(`${req.method} - ${JSON.stringify(req.body)} - ${req.originalUrl}`);
    const { text } = req.body;

    const newTodo = {
        text,
        id: uuidv4(),
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        done: false
    }
    const post = postData(newTodo); 
    res.status(200).send({post});
}

function deleteTodo(req, res){
    info(`${req.method} - ${JSON.stringify(req.body)} - ${req.originalUrl}`);
    const id = req.params.id;
    const deleted = deleteData(id);
    res.status(200).send({deleted});
}

function patchTodo(req, res){
    info(`${req.method} - ${JSON.stringify(req.body)} - ${req.originalUrl}`);
    const id = req.params.id;
    const patch = patchData(id);
    res.status(200).send({patch});
}

module.exports = {getTodos, postTodo, deleteTodo, patchTodo};