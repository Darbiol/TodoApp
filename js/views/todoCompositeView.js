define( function ( require ) {

	var Marionette = require( 'marionette' );
	var TodoItem = require( './todoView' );
	// var compositTemplate = require( './template/todoComposite' )

	var todoList = Marionette.CompositeView.extend({
		tagName : 'div',
		template : '#todoComposite',
		itemView : TodoItem,
		itemViewContainer : 'ul',
		ui : {
			'deleteAll' : 'a#deleteAll',
			'todoInput' : 'input[type=text]',
			'selectAll' : 'a#selectAll',
			'itemsLeft' : 'span#items-left',
			'toRemove' : 'span#toRemove'
		},
		events : {
			'click @ui.deleteAll' : 'deleteDone',
			'keyup @ui.todoInput' : 'keyCode',
			'click @ui.selectAll' : 'flagAll',
		},

		'initialize' : function () {
			this.listenTo( this.collection, 'change', this.checkCollection );
			this.listenTo( this.collection, 'sync', this.updateStatus );
			this.listenTo( this.collection, 'remove', this.updateStatus )
			console.log(this)
			this.collection.fetch({
				success : function(){
					// console.log(self.model)


					var count = this.collection.where({isFinished : true})
					if( count.length === this.collection.length ){
						this.toggleSelectAll();
						this.updateStatus();
					}else if( count.length >0){
						this.updateStatus();
					}else{

					}
				}.bind( this ),
				error : function(){
					console.log('err')
				}
			});
		},
		keyCode : function( e ) {
			// console.log(this)
			if( e.keyCode === 13 ){
				var todoVal = this.ui.todoInput.val();

				if( todoVal === ''){

				}else{
					this.addTodo( todoVal );
				}

			}else{

			}
		},
		addTodo : function( val ){
			var todoInput = val;
			var todoModel = new TodoApp.todoModel( {'todo' : val, 'isFinished' : false});
			todoModel.save({}, {
				success : function(){
					this.collection.add(todoModel);
				}.bind( this ),
				error : function(){
					console.log('err')
				},
				wait : true
			});
			this.clearInputs();
		},
		clearInputs : function (){
			var todoInput = this.ui.todoInput.val('');
		},
		flagAll : function ( e ){
			e.preventDefault();
			console.log(this.collection);
			this.ui.selectAll.toggleClass( 'isSelected' );
			var selectedState = this.ui.selectAll.hasClass( 'isSelected' );

			this.collection.each( function ( model, index){
				model.save( { 'isFinished' : selectedState } );
			} )
			console.log(this.collection)
		},
		toggleSelectAll : function (){
			console.log('please update selectAll');
			this.ui.selectAll.toggleClass('isSelected');
			return 0;
		},
		checkCollection : function(){
			console.log('check')
			var count = this.collection.where({'isFinished' : true}).length
			if( count === this.collection.length ){
				if(this.ui.selectAll.hasClass('isSelected')){

				}else{
				this.ui.selectAll.toggleClass('isSelected')

				}
			}else{
				if( this.ui.selectAll.hasClass('isSelected') ){
					this.ui.selectAll.removeClass('isSelected')
				}
			}
		},
		deleteDone : function(){
			var removeModel = this.collection.where({'isFinished' : true});
			this.collection.each( function( model ){
				if( model.get('isFinished') === true ){
					model.destroy( { wait : true} );
				}else{
					console.log(' not delete');
				}
			} )
		},
		updateStatus : function (){
			var remaining = this.collection.where( { 'isFinished' : false } );
			var toDelete = Math.abs( remaining.length - this.collection.length );
			// console.log(remaining.length)
			this.ui.itemsLeft.text( remaining.length );
			this.ui.toRemove.text( toDelete );
			if( toDelete === 0 ){
				this.ui.deleteAll.addClass('hide')
			}else{
				this.ui.deleteAll.removeClass('hide')
			}
		},
		updateRemove : function(){
			var remaining = this.collection.where({'isFinished' : false});
			this.ui.itemsLeft.text( remaining.length );
			this.ui.toRemove.text( Math.abs( remaining.length - this.collection.length ) );
		}
	});

	return todoList;
} );
