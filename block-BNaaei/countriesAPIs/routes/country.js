const router = require('express').Router();
const Country = require('../models/Country');


router.get( '/', async ( req, res, next ) => {
    try {
        const country = await Country.find()
        res.status( 200 ).json({country});
    } catch ( err ) {
        return next ( err );   
    }
} );

router.get( '/end', async ( req, res, next ) => {
    try {
        res.status( 200 ).json({hi:"hi"});
    } catch ( err ) {
        return next ( err );
    }
} );

router.post( '/', async ( req, res, next ) => {
    try {
        console.log(req.body)
        const country = await Country.create( req.body );
        // const addState = await 
        res.status( 200 ).json( { country } );
    } catch ( err ) {
        return next ( err );
    }
} );

router.put( '/:id/update', async ( req, res, next ) => {
    var id = req.params.id
    try {
        const country = await Country.findByIdAndUpdate( id, req.body, { new: true } );
        res.status( 200 ).json( { country } )
    } catch ( err ) {
        return next ( err );
    }
} );

router.delete( '/:id/delete', async ( req, res, next ) => {
    try {
        const country = await Country.findByIdAndDelete(req.params.id);
        res.status( 200 ).json( { country } );
    } catch ( err ) {
        return next ( err );
    }
} );

module.exports = router;
