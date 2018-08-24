'use strict';

const mongoose = require('mongoose');

// Conect mongoose to a database inside mongo
mongoose.connect('mongodb://localhost:27017/sandbox', {useNewUrlParser: true});

// create a db object to listen for mongoose conection events
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error', err);
});

db.once('open', () => {
  console.log('Conected succesfully');
  // all database comunication goes here

  const Schema = mongoose.Schema;
  const AnimalSchema = new Schema({
    type: {type: String, default: "goldfish"},
    size: String,
    color: {type: String, default: "golden"},
    mass: {type: Number, default: 0.007},
    name: {type: String, default: "Angela"}
  });

  AnimalSchema.pre("save", function(next) {
    if (this.mass >= 5 || this.mass < 100) this.size = "medium";
    if (this.mass >= 100) this.size = "big";
    if (this.mass < 5) this.size = "small";
    next();
  });

  AnimalSchema.statics.findFromSize = function(size, callback) {
    return this.find({size: size}, callback);
  };

  AnimalSchema.methods.findSameColor = function(callback) {
    return this.model("Animal").find({color: this.color}, callback);
  }

  const Animal = mongoose.model("Animal", AnimalSchema);

  const elephant = new Animal({
    type: 'elephant',
    color: 'gray',
    mass: 6000,
    name: 'Dumbo'
  });

  const whale = new Animal({
    type: "whale",
    mass: 190500,
    name: "Fig"
  });

  const animal = new Animal({});

  const animalData = [
    {
      type: 'mouse',
      color: 'gray',
      mass: 0.035,
      name: 'Marvin'
    },
    {
      type: 'nutria',
      color: 'brown',
      mass: 6.35,
      name: 'Gretchen'
    },
    {
      type: 'wolf',
      color: 'gray',
      mass: 45,
      name: 'Iris'
    },
    elephant,
    animal,
    whale
  ];

  // Empty animals collection before saving
  Animal.deleteMany({}, (err) => {
    if (err) console.error(err);
    // Save animals in the collection after the collection its empty
    Animal.create(animalData, (err) => {
      if (err) console.error("Save Failed!", err);
      // Read all the animals inside the collection that has a "big" size
      Animal.findOne({type: "elephant"}, (err, elephant) => {
        if (err) console.error(err);
        elephant.findSameColor(function(err, animals) {
          animals.forEach( animal => console.log(`${animal.name} the ${animal.color} ${animal.type} is a ${animal.size}-sized animal`));
          db.close(() => {
            console.log('Connection closed.');
          });
        });
      });
    });
  });

});