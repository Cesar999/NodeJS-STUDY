const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cesarenc:umbreon50@cluster0.yoliw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = ({locals}) => {
    client.connect((err) => {
        if(err){
            return console.log('Unable to connect to MongoDB server');
        }
        
        locals.client = client;
        locals.db = client.db('MyPokemon');
        // locals.db.createCollection("pokemon");
        // locals.db.collection("pokemon").createIndex({"name": 1}, {unique: true, sparse: true});

        console.log('Connected to MongoDB server');
    });
}

module.exports = {connect};
