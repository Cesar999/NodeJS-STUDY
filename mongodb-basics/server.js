const express = require('express');
const {connect} = require('./database');

const app = express();
app.use(express.json());
connect(app);

const port =  process.env.PORT || 3002;

app.listen(port, () => console.log(`App is listening on port ${port}`));

app.post('/insertPokemon', (req, res)=>{
    const db = req.app.locals.db;
    const poke = req.body;
    db.collection("pokemon").insertOne(poke, function(err, res) {
        if (err) throw err;
        console.log(res.result, res.ops);
        console.log("1 document inserted");
    });
    res.status(200).send({msg: 'Inserted'});
});

app.post('/insertManyPokemon', (req, res)=>{
    const db = req.app.locals.db;
    const {pokes} = req.body;
    db.collection("pokemon").insertMany(pokes, function(err, res) {
        if (err) throw err;
        console.log(res.result, res.ops);
        console.log("many documents inserted");
    });
    res.status(200).send({msg: 'Inserted'});
});

app.get('/findPokemon', (req, res)=>{
    const db = req.app.locals.db;
    const query = {...req.query};
    db.collection("pokemon").find(query, function(err, cursor) {
        if (err) throw err;
        console.log(cursor.toArray(function(err, docs) {
            console.log(docs);
        }));
        console.log("documents found");
    });
    res.status(200).send({msg: 'Found'});
});

app.get('/findOnePokemon/:name', (req, res)=>{
    const db = req.app.locals.db;
    const params = {...req.params};
    db.collection("pokemon").findOne(params, function(err, doc) {
        if (err) throw err;
        console.log(doc);
        console.log("document found");
    });
    doc.status(200).send({msg: 'Found'});
});

app.delete('/deleteOnePokemon/:name', (req, res)=>{
    const db = req.app.locals.db;
    const params = {...req.params};
    db.collection("pokemon").findOneAndDelete(params, function(err, res) {
        if (err) throw err;
        console.log(res);
        console.log("1 document deleted");
    });
    res.status(200).send({msg: 'Deleted'});
});

app.delete('/deleteManyPokemon/:level', (req, res)=>{
    const db = req.app.locals.db;
    const params = {level: parseInt(req.params.level)};
    console.log(params)
    db.collection("pokemon").deleteMany(params, function(err, res) {
        if (err) throw err;
        console.log(res.deletedCount);
        console.log("documents deleted");
    });
    res.status(200).send({msg: 'Deleted'});
});

app.patch('/updateOnePokemon', (req, res)=>{
    const db = req.app.locals.db;
    const {query, update} = req.body;
    db.collection("pokemon").findOneAndUpdate(query,  { $set: update}, function(err, res) {
        if (err) throw err;
        console.log(res);
        console.log("document updated");
    });
    res.status(200).send({msg: 'Updated'});
});

app.patch('/updateManyPokemon', (req, res)=>{
    const db = req.app.locals.db;
    const {query, update} = req.body;
    db.collection("pokemon").updateMany(query,  { $set: update}, function(err, res) {
        if (err) throw err;
        console.log(res.result);
        console.log("documents updated");
    });
    res.status(200).send({msg: 'Updated'});
});

app.put('/replaceOnePokemon', (req, res)=>{
    const db = req.app.locals.db;
    const {query, replace} = req.body;
    db.collection("pokemon").findOneAndReplace(query, replace, function(err, res) {
        if (err) throw err;
        console.log(res);
        console.log("document replaced");
    });
    res.status(200).send({msg: 'Replaced'});
});

app.get('/agregateLevels', async (req, res)=>{
    const db = req.app.locals.db;
    const val = await db.collection("pokemon").aggregate([
        { $match: { types: "Ghost" } },
        { $group: { _id : '$name', total: { $sum: "$level" } } }
     ]).toArray();
    const sdc = await db.collection("pokemon").estimatedDocumentCount("types");
    const distinct = await db.collection("pokemon").distinct("types");
    console.log('count:', sdc, ' distinct:', distinct);
    //console.log(val)
    res.status(200).send({msg: val});
});

app.get('/transactionExample', async (req, res)=>{
    const db = req.app.locals.db;
    const client = req.app.locals.client;
    let msg = '';
   // await db.collection("Trainers").insertOne({name: 'Roberto', age: "30"});
   // await db.collection("pokemon").insertOne({name: 'Salamence', type: 'Dragon', level: 70});
  
  // Step 1: Start a Client Session
  const session = client.startSession();
  
  // Step 2: Optional. Define options to use for the transaction
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };
  
  // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
  // Note: The callback for withTransaction MUST be async and/or return a Promise.
  try {
        const transactionResults = await session.withTransaction(async () => {
            const coll1 = db.collection('Trainers');
            const coll2 = db.collection('pokemon');
            // Important:: You must pass the session to the operations
            await coll1.insertOne({name: 'Roberto', age: "30"}, { session });
            await coll2.insertOne({name: 'Salamence', type: 'Dragon', level: 70}, { session });
        }, transactionOptions);

        if (transactionResults.result.ok === 1) {
            msg = "The transaction was successfully created.";
        } else {
            msg = "The transaction was intentionally aborted.";
        }
    } catch(e){
        msg = "The transaction was aborted due to an unexpected error: " + e;
    } finally {
        await session.endSession();
    }
    console.log(msg)
    res.status(200).send({msg});
});
