var express = require( 'express' ),
	app = express(),
	http = require( 'http' ),
	server = http.createServer( app ),
	port = 3030,
	path = require( 'path' ),
	cwd = process.cwd(),
	files = path.join( cwd );

// ==============  CONFIGURATIONS==============
	//===========CORS===========
var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   // res.header('Content-Type', 'application/json');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
	//==========CORS============

app.use( allowCrossDomain )
app.use( express.static( files ) )

// ==============  CONFIGURATIONS==============


server.listen( port, function(){
	// console.log(files)
	console.log( 'App started. Now Listening to port : '+port );
} )