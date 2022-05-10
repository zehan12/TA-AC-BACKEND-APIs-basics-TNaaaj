const router = require("express").Router();
const Book = require("../models/Book");
const Comment = require("../models/Comment");

//* @desc      list of all books
//* @route     GET /api/v2/book
router.get( '/', async ( req, res, next ) => {
    try {
        const books = await Book.find()
        res.status(200).json({books});
    } catch ( err ) {
        return next( err );
    }
} );

//* @desc      get a single book
//* @route     GET /api/v2/book/:id
router.get( '/:id', async( req, res, next ) => {
    try {
        var id = req.params.id;
        const books = await Book.findById(id).lean().exec();
        res.status(200).json({books});
    } catch ( err ) {
        return next( err );
    }
} );

//* @desc      create a book
//* @route     POST /api/v2/book
router.post( '/', async ( req, res, next ) => {
    try {
        const books = await Book.create( req.body );
        res.status(200).json({books});
    } catch ( err ) {
        return next( err );
    }
} );

//* @desc      update a book
//* @route     PUT /api/v2/book/:id
router.put( '/:id/update', async( req, res, next ) => {
    try {
        var id = req.params.id;
        const books = await Book.findByIdAndUpdate( id, req.body, { new: true } );
        res.status(200).json({books});
    } catch ( err ) {
        return next( err );
    }
} );


//* @desc      delete a book
//* @route     DELETE /api/v2/book/:id
router.get( '/:id/delete', async( req, res, next ) => {
    try {
        var id = req.params.id;
        const books = await Book.findByIdAndDelete( id );
        const comments = await Comment.deleteMany({bookId:id})
        res.status(200).json({books});
    } catch ( err ) {
        return next( err );
    }
} );

module.exports = router;