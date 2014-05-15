requirejs.config({
	baseUrl : '	js',
	paths : {
		jquery : 'vendor/jquery',
		underscore : 'vendor/underscore',
		backbone : 'vendor/backbone',
		marionette : 'vendor/backbone.marionette',
		bootstrap : 'vendor/bootstrap.min'
	},

	shim : {
		underscore : {
			exports : "_"
		},
		backbone : {
			deps : [ "jquery", "underscore"],
			exports : "Backbone"
		},
		marionette : {
			deps : [ 'backbone' ],
			exports : 'Marionette'
		}
	}
});

