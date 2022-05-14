const Country = require("../models/Country");
const mongoose = require("mongoose");
// var co = require('countryjs');

// var obj = [
//     {
//         "name": "India",
//         "continent": "Asia",
//         "population": 13800000,
//         "area": 3287000
//     },
//     {
//         "name": "USA",
//         "continent": "North America",
//         "population": 13800000,
//         "area": 3287000
//     }
// ]

// const obj = co.all().map((e)=>{
//     let n = {};
//     if ( e.name ) {
//     n.contient = e.region;
//     n.name = String(e.name).toUpperCase();
//     n.area = e.area;
//     n.border_shares = e.borders;
//     n.population = e.population;
//     }
//     return n
// })

mongoose.connect(
    'mongodb://localhost/countriesAPIs', (err) => {console.log('Connected to database: in seed ', err ? false : true);});
  

const createCountry = () => {
    
    Country.create(obj)
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