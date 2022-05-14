const router = require('express').Router();
const Country = require('../models/Country');

router.get( '/', async ( req, res, next ) => {
    try {
        console.log(req.query)
        const sort = req.query.sort;
        console.log(sort)
        if ( sort ) {
            const direction = req.query.direction;
            if ( direction !== "desc" ) {
                const country = await Country.find().sort({sort: 1})
                res.status( 200 ).json({country});
            } else {
                const country = await Country.find().sort({sort: -1})
                res.status( 200 ).json({country});
            }
        }
        const country = await Country.find()
        res.status( 200 ).json({country});
    } catch ( err ) {
        return next ( err );   
    }
} );

// router.get( "/", async ( req, res, next ) => {
//     const param = req.par

//     try {
//         if ( param === "sort" ) {
//         }
//     } catch ( err ) {
//         return next ( err );
//     }
// } )


router.post( '/', async ( req, res, next ) => {
    try {
        console.log(req.body)
        let countryData = {};
        countryData = req.body;
        countryData.neighbouring_countires = [];
        countryData.name = req.body.name.toUpperCase();
        countryData.border_shares = req.body.border_shares.split(",").map((v)=>v.trim().toUpperCase());
        console.log(countryData)
        if ( req.body.border_shares ) {
            countryData.border_shares.forEach( async(v)=>{
                const neighbouring_countires = await Country.findOne( { name: v } )
                if ( neighbouring_countires ) {
                    countryData.neighbouring_countires.push( neighbouring_countires._id )
                }
            })
        }
        const country = await Country.create( countryData );
        res.status( 200 ).json( { country } );
    } catch ( err ) {
        return next ( err );
    }
} );

router.put( '/:id/update', async ( req, res, next ) => {
    var id = req.params.id
    try {
        // req.body.border_shares = req.body.border_shares.split(",").map((e)=>e.trim().toUpperCase())
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
