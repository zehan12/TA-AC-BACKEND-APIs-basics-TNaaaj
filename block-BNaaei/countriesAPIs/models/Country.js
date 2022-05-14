const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema( {
    name: { type: String, required: true, unique: true },
    states: [{ type: Schema.Types.ObjectId, ref: "states" }],
    continent: String,
    population: { type: Number, default:100000},
    ethnicity: String,
    neighbouring_countires: [{ type: Schema.Types.ObjectId, ref: "country" }],
    border_shares: [{ type: String }],
    area: Number
} );


countrySchema.pre('save', function (next) {
    // capitalize
    this.name.charAt(0).toUpperCase() + this.name.slice(1);

    next();
});

// countrySchema.pre('save', function (next) {
//     if ( typeof this.population === "string" ){
//         Number(this.population.split(",").join(""));
//         next();
//     } else {
//         next();
//     }
// });

// countrySchema.pre( 'save', function ( next ) {
//     this.border_shares.split(",");
// } )

module.exports = mongoose.model( "Country", countrySchema );