"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectWithRetry = void 0;
const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://cesarenc:umbreon50@cluster0.yoliw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectWithRetry = function () {
    return mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};
exports.connectWithRetry = connectWithRetry;
