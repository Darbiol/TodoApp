define( function ( require ) {
	'use strict';

	var todoApp = require( 'js/app.js' );
	//console.log(todoApp)
	todoApp.module( 'Todo.Views', function ( Views ) {

		Views.ItemView 		= require( 'views/todoView' );
		Views.Navigation 	= require( 'views/todoNavigation' );
		Views.LayoutView 	= require( 'views/todoLayoutView' );
		Views.CompositeView = require( 'views/todoCompositeView' );

	} );

} );