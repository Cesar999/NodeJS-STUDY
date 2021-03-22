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

trainerSchema.pre('findOneAndUpdate', async function(next) {
    // // If you call `next()` with an argument, that argument is assumed to be
    // // an error.
    // const docToUpdate = await this.findOne(this.getQuery());
    // console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify
    // if(docToUpdate.team.length>=6){
    //     const err = new Error('something went wrong');
    //     next(err);
    // }
});

// @ts-expect-error:
trainerSchema.pre('save', function(next: any, req: any) {
    console.log('Before Saving', req.body);
    if(req.body.name === 'badword'){
        const err = new Error('something went wrong');
        next(err);
    }
    next();
});

trainerSchema.pre('updateOne', async function(){
    // @ts-expect-error:
    console.log('trainerSchema Pre updateOne', this._update); 
    // @ts-expect-error:
    console.log('trainerSchema Pre updateOne', this.getQuery()); 
})

pokemonSchema.pre('save', function(next) {
    console.log('pokemonSchema Pre save', this.get('name'));
    next();
});
pokemonSchema.pre('findOne', function() {
    console.log('pokemonSchema Pre findOne', this.getQuery()); 
});
pokemonSchema.pre('deleteOne', function() {
    // @ts-expect-error:
    console.log('pokemonSchema Pre deleteOne', this.getQuery()); 
});

pokemonSchema.post('save', function(doc) {
    console.log('pokemonSchema Post save', doc.name);
});
pokemonSchema.post('findOne', function(doc) {
    console.log('pokemonSchema Post findOne', doc.name);
});

const Trainer = mongoose.model('trainer', trainerSchema);
const Pokemon = mongoose.model('pokemon', pokemonSchema);

export {Trainer, Pokemon}
