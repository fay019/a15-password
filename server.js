const express = require( 'express' );
const app = express();
const PORT = process.env.PORT || 3000;
const password = require( './helpers/password' )

const server = app.listen( PORT, () => {
    console.log( 'Express-Server on: http://localhost: ' + PORT );
} );

app.use( express.static( 'www' ) );
app.use( express.urlencoded( { extended:true } ) ) // for parsing application/x-www-form-urlencoded


app.get( '/api/generator/:myLength/:options', ( req, res ) => {
    let myPassword = password.generator( req.params.myLength, req.params.options );
    let checkPassword = password.checkPassword( myPassword );
    res.status( 200 ).send( [myPassword, checkPassword]);
} );

app.get( '/api/checker/:password', ( req, res ) => {
    console.log(req.params.password)
    let checkPassword = password.checkPassword( req.params.password ).toString();
    res.status( 200 ).send( checkPassword);
} );

app.get( [ '/generator','generator.html' ], ( req, res ) => {
    console.log( req.body );
    res.status( 200 ).redirect( './generator.html' );
} );

app.get( [ '/checker','checker.html' ], ( req, res ) => {
    console.log( req.body );
    res.status( 200 ).redirect( './checker.html' );
} )