const router = require('express').Router();
const Country = require('../models/Country');
const State = require('../models/State');


router.get( '/', async ( req, res, next ) => {
    try {
        const state = await State.find();
        res.status( 200 ).json( { state } );
    } catch ( err ) {
        return next ( err );    }
} );

router.post( '/', async ( req, res, next ) => {
    try {
        const countryFound = await Country.find( { name: req.body.country } );
        if ( countryFound ) {
            req.body.countryId = countryFound[0]._id;
            const state = await State.create(req.body);
            const country = await Country.findByIdAndUpdate( countryFound[0]._id, { $push: { states: state._id } }, { new: true } );
            res.status( 200 ).json( { state,country } );
        } else {
            res.status( 200 ).json( { m:"hi" } )
        }
    } catch ( err ) {
        return next ( err );
    }
} );

router.put( '/:id/update', async ( req, res, next ) => {
    try {
        const state = await State.findByIdAndUpdate( req.params.id , req.body, { new: true } );
        res.status( 200 ).json( { state } )
    } catch ( err ) {
        return next ( err );
    }
} );

router.delete( '/:id/delete', async ( req, res, next ) => {
    try {
        const state = await State.findByIdAndDelete(req.params.id);
        const country = await Country.findOneAndUpdate( { name: state.country }, { $pull: { states: state._id } }, { new: true } );
        res.status( 200 ).json( { state, country } );
    } catch ( err ) {
        return next ( err );
    }
} );

module.exports = router;