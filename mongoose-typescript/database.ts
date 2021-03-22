const mongoose = require('mongoose')
const mongoUrl = "mongodb+srv://cesarenc:umbreon50@cluster0.yoliw.mongodb.net/Pokemon-Trainers?retryWrites=true&w=majority";

const connectWithRetry = function() {
  return mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, function(err: any) {
      console.log('Database Connected');
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};

export { connectWithRetry };