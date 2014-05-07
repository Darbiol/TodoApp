var express = require( 'express' ),
	app = express(),
	http = require( 'http' ),
	server = http.createServer( app ),
	port = 3030,
	path = require( 'path' ),
	cwd = process.cwd(),
	files = path.join( cwd ),
	bodyParser = require( 'body-parser' ),
	mongoose = require( 'mongoose' ),
	todoApi = require( './controller/todoApi' ),
	connect = require( 'connect' ),
	todoModel = require( './model/todoModel' );


mongoose.connect('mongodb://localhost/todoApp', function (err){
	if(err) {console.log(err);}
	else{console.log('connected to database: todoApp')}
});


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
app.use( connect.bodyParser() );
app.use( allowCrossDomain );
app.use( express.static( files ) );

// ==============  CONFIGURATIONS==============

// ===========   ROUTES  ==============
app.get( '/todo' , todoApi.getTodo) //get all list of todo.
app.post( '/todo', todoApi.addTodo ) // add todo
app.put( '/todo/:id', todoApi.updateTodo ) // update specific  todo item
app.delete( '/todo/:id', todoApi.removeTodo ) // delete specific todo item


server.listen( port, function(){
	// console.log(files)
	console.log( 'App started. Now Listening to port : '+port );
} )