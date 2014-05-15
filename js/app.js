define( function ( require ) {

	var Marionette = require( 'marionette' );
	var todoCollection = require( 'collection/todoCollection' );
	var todoLayout = require( 'views/todoLayoutView' );
	var todoComposite = require( 'views/todoCompositeView' );

	//main app
	var TodoApp = new Marionette.Application();

	TodoApp.addRegions({
		mainRegion : '#main-region'
	});

	TodoApp.on( 'initialize:after', function(){
		console.log( 'app is initialized' );

		var todosCollection = new todoCollection();

		var todos = new todoComposite( { collection : todosCollection } )

		var layout = new todoLayout();//layout


		TodoApp.mainRegion.show( layout );
		layout.listTodo.show( todos );

	} )

	return TodoApp;
} );
