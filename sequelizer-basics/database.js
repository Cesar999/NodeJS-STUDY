const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql_example_2', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const db = {};

db.testConnection = testConnection;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pokemon = require('./models/pokemon')(sequelize, Sequelize);
db.trainer = require('./models/trainer')(sequelize, Sequelize);

db.trainer .hasMany(db.pokemon, {foreignKey: 'trainer_id'});
db.pokemon.belongsTo(db.trainer, {foreignKey: 'trainer_id'});

module.exports = db;