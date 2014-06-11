define( function ( require ) {

	return function () {

		var todoApp = require( 'app' );
		var Marionette = require( 'marionette' );
		var Vent = require( 'vent' );
		var todoCollection = require( 'collection/todoCollection' );
		// var view =  require( 'views' );

	todoApp.module( 'Todo.Views', function ( Views ) {

		Views.ItemView 		= require( 'views/todoView' );
		Views.Navigation 	= require( 'views/todoNavigation' );
		Views.LayoutView 	= require( 'views/todoLayoutView' );
		Views.CompositeView = require( 'views/todoCompositeView' );

	} );


		todoApp.module( 'Todo', function ( Todo ) {
			// require( 'views' );
			// views();

			Todo.Router = Marionette.AppRouter.extend( {
				appRoutes : {
					'all' : 'listAll',
					'todos' : 'listTodo'
				}
			} );

			var API = {

				'listAll' : function () {
					console.log( 'listAll items' );
					console.log( Todo );
					var todosCollection = new todoCollection();
					var todos = new Todo.Views.CompositeView( { collection : todosCollection } )
					var layout = new Todo.Views.LayoutView();//layout
					var  nav = new Todo.Views.Navigation();

					//TodoApp.mainRegion.show( layout );
					Todo.app.mainRegion.show( layout );
					console.log(nav)
					layout.navTodo.show( nav );
					layout.listTodo.show( todos );

				},
				'listTodo' : function () {
					console.log( 'listTodo items' )
				},
				'listDone' : function () {
					console.log( 'list done items' )
				}

			}

			this.listenTo( Vent, 'todo:all', function (  ) {
				console.log('all');
				todoApp.navigate( 'all' );
				API.listAll();
			} );

			this.listenTo( Vent, 'todo:todos', function (  ) {
				console.log('todos');
				todoApp.navigate( 'todos' );
				API.listTodo();
			} );

			this.listenTo( Vent, 'todo:done', function (  ) {
				console.log('done');
				todoApp.navigate( 'done' );
				API.listDone();
			} );

			todoApp.addInitializer( function () {

				new Todo.Router( {
					'controller' : API
				} );

			} );

		} );
	}

} );