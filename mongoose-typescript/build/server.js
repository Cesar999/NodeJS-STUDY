"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const routes_1 = require("./routes");
//Coonect to DataBase
database_1.connectWithRetry();
//Server Express
const app = express_1.default();
const port = 3002;
app.listen(port, () => {
    console.log(`Server On Port ${port}`);
});
//Routes
app.post('/createTrainer', routes_1.createTrainer);
