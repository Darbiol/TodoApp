
define( function ( require ) {
	var Marionette = require( 'marionette' );
	var LayoutTemplate = require( 'doT!template/todoLayout' );
	var dotCompiler = require( 'doTCompiler' );

	return Marionette.Layout.extend({
		template : LayoutTemplate, //'#todoLayout',
		regions : {
			navTodo : '#todo-nav',
			listTodo : '#todo-list',
		},
		initialize : function(){
			// console.log(this.template)
		}
	});

	//return TodoLayout;
} );