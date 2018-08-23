'use strict';

const mongoose = require('mongoose');

// Conect mongoose to a database inside mongo
mongoose.connect('mongodb://localhost:27017/sandbox');

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
    type: String,
    size: String,
    color: String,
    mass: Number,
    name: String
  });

  const Animal = mongoose.model("Animal", AnimalSchema);

  const elephant = new Animal({
    type: 'elephant',
    size: 'big',
    color: 'gray',
    mass: 6000,
    name: 'Dumbo'
  });

  elephant.save((err) => {
    if (err) console.error("Save Failed!", err);
    else console.log("Saved!");

    db.close(() => {
      console.log('Connection closed.');
    });
  });

})