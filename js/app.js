define( function ( require ) {

	var Marionette = require( 'marionette' );
	var Backbone = require( 'backbone' );
	var todoCollection = require( 'collection/todoCollection' );
	var todoLayout = require( 'views/todoLayoutView' );
	var todoComposite = require( 'views/todoCompositeView' );
	var todoNavigation = require( 'views/todoNavigation' )

	//main app
	var TodoApp = new Marionette.Application();

	TodoApp.addRegions({
		mainRegion : '#main-region'
	});

	//  ROUTING

	TodoApp.navigate = function ( route, options ){
		options = options || { };
		Backbone.history.navigate( route, options );
	};

	TodoApp.getCurrentRoute = function (){
		return Backbone.history.fragment;
	};



	TodoApp.on( 'initialize:after', function(){
		console.log( 'app is initialized' );

		if( Backbone.history ){
			Backbone.history.start();

			if( this.getCurrentRoute() === '' ){
				TodoApp.trigger('todo:all')
			}
		}



		var todosCollection = new todoCollection();

		var todos = new todoComposite( { collection : todosCollection } )

		var layout = new todoLayout();//layout


		TodoApp.mainRegion.show( layout );
		layout.navTodo.show( new todoNavigation );
		layout.listTodo.show( todos );

	} )

	return TodoApp;
} );
