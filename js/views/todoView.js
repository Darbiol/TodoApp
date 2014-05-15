define( function ( require ){

	var Marionette = require( 'marionette' );

	return TodoItem = Marionette.ItemView.extend({
			tagName : 'li',
			className : 'list-item',
			template : '#todoList',
			ui : {
				'todoDelete' : 'a.del',
				'finished' : 'a#checker',
				'contents' : 'span',
				'editTodo' : 'input#editMode',
			},
			modelEvents : {
				'change:isFinished' : 'updateDone',
				'change:todo' : 'updateText'
			},
			events : {
				'click @ui.todoDelete' : 'deleteItem',
				'click @ui.finished' : 'toggleDone',
				'dblclick @ui.contents' : 'toggleEdit',
				'focusout @ui.editTodo' : 'editMode',
				'keyup @ui.editTodo' : 'catchEnter'
			},
			initialize : function (){

			},
			'onRender' : function(){

				if( this.model.get( 'isFinished' ) === true ){
					this.$el.addClass( 'isDone' )
				}else{
					this.$el.addClass( '' )
				}
			},

			deleteItem : function( e ){
				e.preventDefault();
				this.model.destroy();
			},
			toggleDone : function( e ){
				e.preventDefault();
				console.log(this)
				var currentState = this.model.get( 'isFinished' );
				this.model.save( { 'isFinished' : !currentState }, {
					dataType : 'text',
					success : function () {
						console.log( 'succ' )
					},
					error : function ( model , response ) {
						console.log('err');
					},
					wait : true
				} );

			},
			toggleEdit : function( e ){
				var contents = this.ui.contents.text();

				this.ui.contents.hide();
				this.ui.editTodo.attr( 'type', 'text' ).val( contents ).focus();

			},
			editMode : function( e ){

				var newContent = this.ui.editTodo.val();

				if ( newContent === '' ) {
					this.model.destroy();
				} else {
					this.$el.find( 'input' ).attr( 'type', 'hidden' );
					this.$el.find( 'span' ).show();//.html( newContent ).show();
					//update
					this.updateTodo( newContent );
				}
				console.log(this)

			},
			catchEnter : function ( e ){
				if( e.keyCode === 13 ){
					// console.log('asdas')
					var newContent = this.ui.editTodo.val();

					if ( newContent === '' ) {
						this.model.destroy();
					} else {
						//update
						this.updateTodo( newContent );
					}
				}else{
				}
			},
			updateTodo : function( content ){
				this.model.save( { 'todo' : content }, {
					success : function(){
					},
					error : function(){

					},
					wait : true
				} )
			},
			updateDone : function(){
				console.log('finished');
				this.$el.toggleClass( 'isDone' );
			},
			updateText : function(){
				console.log( 'update text' )
				this.$el.find( 'span' ).text(this.model.get( 'todo' ));
				this.$el.find( 'input' ).attr( 'type', 'hidden' );
				this.$el.find( 'span' ).show();
			}
		})

	//return TodoItem;
} )