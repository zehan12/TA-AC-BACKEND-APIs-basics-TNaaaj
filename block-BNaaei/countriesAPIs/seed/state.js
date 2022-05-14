const State = require("../models/State");
const mongoose = require("mongoose");
var World        = require('country-state-city')

var obj = [
]

obj = World.State.getStatesOfCountry("IN")

mongoose.connect(
    'mongodb://localhost/countriesAPIs', (err) => {console.log('Connected to database: in seed ', err ? false : true);});
  

const createCountry = () => {
    
    State.create(obj)
    .then(function(data) {
         console.log(data)
         mongoose.disconnect();
    })
    .catch(function(err) {
        console.log(`something get wrong`)
        console.error(err)
    });
}

createCountry()