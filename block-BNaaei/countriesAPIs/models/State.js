const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema( {
    name:  { type: String, required: true, unique: true, index: true },
    country: String,
    countryId: { type: Schema.Types.ObjectId, ref: "country" },
    population: { type: Number, default: 400000 },
    area: Number,
    neighbouring_states: [ { type: Schema.Types.ObjectId, ref: "states" } ]
} )

module.exports = mongoose.model( "State", stateSchema );