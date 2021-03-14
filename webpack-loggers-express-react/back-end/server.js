const express = require('express'); //require express module
const {getTodos, postTodo, deleteTodo, patchTodo} = require('./routes.js');
const morgan = require('morgan');
const path = require('path');

const app = express(); 
const port =  process.env.PORT || 3002; 
app.use(express.json()); 

app.use(express.static('../build'));

// app.use(morgan(':method :url - :response-time ms'));

app.use((req, res, next) => {
    const whitelist = [
        'http://localhost:3000',
        'http://192.168.99.100:3000'
    ];
    const origin = req.headers.origin || '';
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/', (req, res) => {
    console.log(path.resolve(path.dirname('')));
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.get('/getTodos', getTodos);
app.post('/postTodo', postTodo);
app.delete('/deleteTodo/:id', deleteTodo);
app.patch('/patchTodo/:id', patchTodo);

//use the listen method to asing a port and a callback function
app.listen(port, () => console.info(`App is listening on port ${port}`));

