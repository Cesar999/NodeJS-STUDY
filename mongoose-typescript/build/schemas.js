"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = exports.Trainer = void 0;
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
const trainerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    team: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pokemon'
        }]
});
const pokemonSchema = new Schema({
    name: { type: String, required: true, unique: true },
    id: { type: Number, required: true },
    ability: { type: String, required: true, unique: true },
    moves: {
        type: [{ type: String, required: true, unique: true }],
        validate: [movesLimit, '{PATH} must have 4 moves']
    },
    types: {
        type: [{ type: String, required: true, unique: true }],
        validate: [typesLimit, '{PATH}must have 1 or 2 types']
    }
});
function movesLimit(val) {
    return val.length === 4;
}
function typesLimit(val) {
    return (val.length <= 2) && (val.length >= 1);
}
const Trainer = mongoose.model('Trainer', trainerSchema);
exports.Trainer = Trainer;
const Pokemon = mongoose.model('Pokemon', pokemonSchema);
exports.Pokemon = Pokemon;
