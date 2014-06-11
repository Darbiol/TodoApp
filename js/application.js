define( function ( require ) {

	var TodoApp = require( 'app' );
	var routes = require( 'todoRoutes' )

	TodoApp.on( 'initialize:after', function() {
		routes();
		console.log('dasd')
	} );

} );