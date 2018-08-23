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
    size: {type: String, default: "small"},
    color: {type: String, default: "golden"},
    mass: {type: Number, default: 0.007},
    name: {type: String, default: "Angela"}
  });

  const Animal = mongoose.model("Animal", AnimalSchema);

  const elephant = new Animal({
    type: 'elephant',
    size: 'big',
    color: 'gray',
    mass: 6000,
    name: 'Dumbo'
  });

  const whale = new Animal({
    type: "whale",
    size: "big",
    mass: 190500,
    name: "Fig"
  });

  const animal = new Animal({});

  // Empty animals collection before saving
  Animal.deleteMany({}, (err) => {
    if (err) console.error(err);
    // Save animals in the collection after the collection its empty
    elephant.save((err) => {
      if (err) console.error("Save Failed!", err);
      animal.save((err) => {
        if (err) console.error("Save Failed!", err);
        whale.save((err) => {
          if (err) console.error("Save Failed!", err);
          // Read all the animals inside the collection that has a "big" size
          Animal.find({size: "big"}, (err, animals) => {
            if (err) console.error(err);
            animals.forEach( animal => console.log(`${animal.name} the ${animal.color} ${animal.type}`));
            db.close(() => {
              console.log('Connection closed.');
            });
          });
        });
      });
    });
  });

});