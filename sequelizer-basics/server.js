const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const {connect} = require('./database');

app.use(express.json());

const db = require('./database');
db.sequelize.sync();
db.testConnection();

const trainersRoute = require('./routes/trainers');
const pokemonRoute = require('./routes/pokemon');
app.use('/pokemon', pokemonRoute);
app.use('/trainer', trainersRoute);

const port =  process.env.PORT || 3002;
app.listen(port, () => console.log(`App is listening on port ${port}`));

app.get('/', (req, res) => {
    res.send({mgs: 'Home'});
});
