const mongoose = require("mongoose"), Schema = mongoose.Schema;

var commentSchema = new Schema( {
    content: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book" } 
}, { timestamps: true } );

module.exports = mongoose.model( "Comment", commentSchema );