const Country = require("../models/Country");

var obj = [
    {
        "name": "India",
        "continent": "Asia",
        "population": 13800000,
        "area": 3287000
    },
    {
        "name": "USA",
        "continent": "North America",
        "population": 13800000,
        "area": 3287000
    }
]

const createCountry = () => {
    
    Country.insertMany(obj)
    .then(function(mongooseDocuments) {
         /* ... */
    })
    .catch(function(err) {
        /* Error handling */
    });
}

createCountry()