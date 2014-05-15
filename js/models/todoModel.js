define( function ( require ) {

	var Backbone = require( 'backbone' );

	TodoModel = Backbone.Model.extend({
		idAttribute : '_id',
		urlRoot : 'http://localhost:3030/todo'
	})

	return TodoModel;
} );