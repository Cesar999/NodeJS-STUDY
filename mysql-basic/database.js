const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mysql_example_1'
});

function connect({locals}){
    connection.connect(function(err) {
        if (err) {
        console.error('error connecting: ' + err.stack);
        return;
        }
    
        console.log('database connected as id ' + connection.threadId);
        locals.db = connection;
    });
}
 
module.exports = {connect};
