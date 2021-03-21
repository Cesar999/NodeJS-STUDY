import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    name: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    team: {
        type: [{type: mongoose.Schema.Types.ObjectId}],
        ref: 'pokemon',
        required: true
    }
});

const pokemonSchema = new Schema({
    name: {type: String, required: true},
    id: {type: Number, required: true},
    ability: {type: String, required: true},
    moves: {
        type: [{type: String, required: true}],
        validate: [movesLimit, '{PATH} must have 4 moves']
    },
    types: {
        type: [{type: String, required: true}],
        validate: [typesLimit, '{PATH}must have 1 or 2 types']
    },
    trainer:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer',
        required: true
    }
});

function movesLimit(val: Array<string>) {
    return val.length === 4;
}
function typesLimit(val: Array<string>) {
    return (val.length <= 2) && (val.length >= 1);
}

trainerSchema.path('team').validate(function (value: any) {
    if (value.length > 6) {
      throw new Error("Trainer's team can have max of 6 pokemon");
    }
});

const Trainer = mongoose.model('trainer', trainerSchema);
const Pokemon = mongoose.model('pokemon', pokemonSchema);

export {Trainer, Pokemon}
