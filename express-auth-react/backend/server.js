const express = require('express');
const cookieParser = require('cookie-parser');
const {authenticator} = require('./auth.js');
const {loginPost, registerPost, authenticateGet, logoutGet, getAllUsers} = require('./routes.js');

//Server Express
const app = express();
const port =  process.env.PORT || 3002;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    const whitelist = [
        'http://localhost:3000',
        'http://localhost:8080'
    ];
    const origin = req.headers.origin;
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(port, () => console.log(`App is listening on port ${port}`));

//Routes
app.post('/login', loginPost);
app.post('/register', registerPost);
app.get('/authenticate', authenticator(), authenticateGet);
app.get('/logout', logoutGet);
app.get('/getAllUsers', authenticator(), getAllUsers);
