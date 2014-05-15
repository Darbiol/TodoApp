
define( function ( require ) {
	var Marionette = require( 'marionette' );

	TodoLayout = Marionette.Layout.extend({
		template : '#todoLayout',
		regions : {
			navTodo : '#todo-nav',
			listTodo : '#todo-list',
		}
	});

	return TodoLayout;
} );