require.config({
	baseUrl : 'js',
	paths : {
		'jquery' 				: 'vendor/jquery/dist/jquery',
		'underscore' 			: 'vendor/underscore/underscore',
		'backbone'	 			: 'vendor/backbone/backbone',
		'backbone.babysitter' 	: 'vendor/backbone.babysitter/lib/backbone.babysitter',
		'backbone.wreqr'		: 'vendor/backbone.wreqr/lib/backbone.wreqr',
		'marionette' 			: 'vendor/marionette/lib/core/amd/backbone.marionette',
		'bootstrap' 			: 'vendor/bootstrap/dist/js/bootstrap',
		'text'					: 'vendor/requirejs-text/text',
		'doT'					: 'vendor/requirejs-doT/doT',
		'doTCompiler'			: 'vendor/doT/doT'

	},

	doT: {
		ext: '.dot', // extension of the templates, defaults to .dot
		templateSettings: {
		  evaluate:    /\{\{([\s\S]+?)\}\}/g,
		  interpolate: /\{\{=([\s\S]+?)\}\}/g,
		  encode:      /\{\{!([\s\S]+?)\}\}/g,
		  use:         /\{\{#([\s\S]+?)\}\}/g,
		  define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
		  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
		  iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
		  varname: 'it',
		  strip: true,
		  append: true,
		  selfcontained: false
		}
	 },

	shim : {
		jquery: {
		  exports: "$"
		},
		underscore : {
			deps : [ "jquery" ],
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

