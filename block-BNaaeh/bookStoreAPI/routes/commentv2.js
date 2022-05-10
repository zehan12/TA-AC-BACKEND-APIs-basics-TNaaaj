const router = require("express").Router({mergeParams:true});

const Comment = require("../models/Comment");
const Book = require("../models/Book");
const { findById, findByIdAndDelete } = require("../models/Book");

//* @desc      add comment to Book
//* @route     POST /api/v1/book/bookId/comment/new
router.post('/:id/new', async (req, res, next) => {
    console.log('Hi');
    try {
        const bookId = req.params.id;
        req.body.bookId = bookId;
        const comment = await Comment.create(req.body);
        const book = await Book.findByIdAndUpdate(bookId, {
                $push: { commentId: comment._id },});
        res.status(200).send(comment);
    } catch (err) {
        return next(err);
    }
});

//* @desc      show all comment of specfic book
//* @route     GET /api/v1/book/bookId/comment
router.get( '/', async ( req, res, next ) => {
    const bookId = req.params.bookId;
    try {
        const comment = await Comment.find();
        res.status(200).json({comment});
    } catch ( err ) {
        return next( err );
    }
} );

//* @desc      update a comment of a book
//* @route     PUT /api/v1/book/bookId/comment/commentId/update
router.put( '/:id/update', async( req, res, next ) => {
    const bookId = req.params.bookId;
    const id = req.params.id;
    try {
        const comment = Comment.findByIdAndUpdate( id, req.body, { new: true } );
        res.status(200).json({comment});
    } catch ( err ) {
        return next ( err )
    }
} )

//* @desc      delete a comment of a book
//* @route     DELETE /api/v1/book/bookId/comment/commentId/delete
router.delete( '/:id/delete', async( req, res, next ) => {
    const bookId = req.params.bookId;
    const id = req.params.id;
    try {
        const comment = await Comment.findByIdAndDelete( id );
        const book = await Book.findByIdAndUpdate( bookId, { $pull : { commentId: comment._id } } )
        res.status(200).json({comment});
    } catch ( err ) {
        return next ( err );
    }
} )

module.exports = router