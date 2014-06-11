define( function ( require ) {

	var Marionette = require( 'marionette' );
	var todoNavigationTemplate = require( 'doT!template/todoNavigation' );
	var Vent = require( 'vent' );

	return Marionette.ItemView.extend( {
		template :todoNavigationTemplate,
		tagName : 'ul',
		id : 'navigation',
		ui : {
			'all' : 'a[href="#All"]',
			'todo' : 'a[href="#Todo"]',
			'done' : 'a[href="#Done"]'
		},
		events : {
			'click @ui.all' : 'allTodo',
			'click @ui.todo' : 'itemTodo',
			'click @ui.done' : 'doneTodo'
		},
		allTodo : function( e ){
			e.preventDefault();
			this.toggleSiblings( e );
			Vent.trigger( 'todo:all' )
		},
		itemTodo : function( e ){
			e.preventDefault();
			this.toggleSiblings( e );
			Vent.trigger( 'todo:todos' )
		},
		doneTodo : function( e ){
			e.preventDefault();
			this.toggleSiblings( e );
			Vent.trigger( 'todo:done' )
		},
		toggleSiblings : function( event ){
			$( event.target ).addClass( 'active' );
			$( event.target ).parent().siblings().each( function(){
				$( this ).children().removeClass( 'active' );
			} )
		}
	} );

} );