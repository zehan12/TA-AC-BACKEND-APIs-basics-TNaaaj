const mongoose = require("mongoose"), Schema = mongoose.Schema;

var bookSchema = new Schema( {
    title: { type: String, required: true, unique: true },
    description: String,
    commentId: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    author: String,
    Image: String,
    website: String,
    pages: Number
} , { timestamps: true } );

module.exports = mongoose.model( "Book", bookSchema  );