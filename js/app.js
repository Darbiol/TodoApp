

	var TodoApp = new Marionette.Application();

//  MODEL

	TodoApp.todoModel = Backbone.Model.extend({
		idAttribute : '_id',
		urlRoot : 'http://localhost:3030/todo'
	})

//COLLECTION
	TodoApp.todoCollection = Backbone.Collection.extend({
		model : TodoApp.todoModel,
		url : 'http://localhost:3030/todo'
	});


	TodoApp.addRegions({
		mainRegion : '#main-region'
	});

	// ===========   TEMPLATE  ===============
	TodoApp.TodoLayout = Marionette.Layout.extend({
		template : '#todoLayout',
		regions : {
			// addTodo : '#todo-add',
			listTodo : '#todo-list',
			// todoStatus : '#todo-status'
		}
	});


	TodoApp.StaticView = Marionette.ItemView.extend({
		//template : '#input-todo',
		//tagName : 'span',
		// className : 'list-item'
		//ui : {
			// 'todoInput' : 'input[type=text]',
			// 'selectAll' : 'a#selectAll'
		//},
		//events : {
			// 'keyup @ui.todoInput' : 'keyCode',
			// 'click @ui.selectAll' : 'flagAll',
		//},
		// initialize : function () {
		// 	var self = this;
		// 	this.collection.fetch({
		// 		success : function(){
		// 			// console.log(self.model)
		// 			// self.listenTo( self.collection, 'change', self.checkCollection )
		// 			var count = self.collection.where({isFinished : true})
		// 			if( count.length === self.collection.length ){
		// 				self.toggleSelectAll();
		// 			}else{
		// 			}
		// 		},
		// 		error : function(){
		// 			console.log('err')
		// 		}
		// 	});
		// }
			// this.listenTo(this.collection, 'reset', 'SelectAll')
			// this.collection.fetch()
			// console.log(this.collection);
			// console.log( this.collection.where( { 'isFinished' : true } ) );
			// var count = _.reduce( this.collection, function(memo, num){
			// 	console.log(memo)
			// });
			// console.log( count.length );
		// },
		// keyCode : function( e ) {
		// 	console.log(this)
		// 	if( e.keyCode === 13 ){

		// 		var todoVal = this.ui.todoInput.val();
		// 		this.addTodo( todoVal );
		// 	}else{

		// 	}
		// },
		// addTodo : function( val ){
		// 	var todoInput = val;
		// 	var todoModel = new TodoApp.todoModel( {'todo' : val, 'isFinished' : false});
		// 	var selfView = this;
		// 	todoModel.save({}, {
		// 		success : function(){
		// 			selfView.collection.add(todoModel);
		// 		},
		// 		error : function(){
		// 			console.log('err')
		// 		},
		// 		wait : true
		// 	});
		// 	this.clearInputs();
		// },
		// clearInputs : function (){
		// 	var todoInput = this.ui.todoInput.val('');
		// },
		// flagAll : function ( e ){
		// 	e.preventDefault();
		// 	console.log(this.collection);
		// 	this.ui.selectAll.toggleClass( 'isSelected' );
		// 	var selectedState = this.ui.selectAll.hasClass( 'isSelected' );
		// 	// console.log(selectedState)
		// 	this.collection.each( function ( model, index){
		// 		// model.set( { 'isFinished' : selectedState } );
		// 		model.save( { 'isFinished' : selectedState } );
		// 	} )
		// 	console.log(this.collection)
		// },
		// toggleSelectAll : function (){
		// 	console.log('please update selectAll');
		// 	this.$el.find('a').toggleClass('isSelected');
		// 	return 0;
		// },
		// checkCollection : function(){
		// 	console.log('check')
		// 	var count = this.collection.where({'isFinished' : true}).length
		// 	if( count === this.collection.length ){
		// 		if(this.ui.selectAll.hasClass('isSelected')){

		// 		}else{
		// 		this.ui.selectAll.toggleClass('isSelected')

		// 		}
		// 	}else{
		// 		if( this.ui.selectAll.hasClass('isSelected') ){
		// 			this.ui.selectAll.removeClass('isSelected')
		// 		}
		// 	}
		// }

	});



	TodoApp.TodoItem = Marionette.ItemView.extend({
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
			//this.listenTo( this.model, ,  this.)

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

	// TodoApp.TodoList = Marionette.CollectionView.extend({
	// 	tagName : 'ul',
	// 	className : 'non-list',
	// 	itemView : TodoApp.TodoItem
	// });

	TodoApp.TodoList = Marionette.CompositeView.extend({
		tagName : 'div',
		template : '#todoComposite',
		itemView : TodoApp.TodoItem,
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
			// this.listenTo( this.collection, 'sync', this.toggleSelectAll );
			this.collection.fetch({
				success : function(){
					// console.log(self.model)
					this.listenTo( this.collection, 'change', this.checkCollection );
					this.listenTo( this.collection, 'sync', this.updateStatus );
					this.listenTo( this.collection, 'remove', this.updateStatus )
					// this.listenTo( this.collection, 'reset', this.deleteDone );

					var count = this.collection.where({isFinished : true})
					if( count.length === this.collection.length ){
						this.toggleSelectAll();
						this.updateStatus();
					}else if( count.length >0){
						this.updateStatus();
					}else{

					}
				}.bind(this),
				error : function(){
					console.log('err')
				}
			});
		},
		// onShow function(){
		// 	console.log( as )
		// },
		keyCode : function( e ) {
			// console.log(this)
			if( e.keyCode === 13 ){

				var todoVal = this.ui.todoInput.val();
				this.addTodo( todoVal );
			}else{

			}
		},
		addTodo : function( val ){
			var todoInput = val;
			var todoModel = new TodoApp.todoModel( {'todo' : val, 'isFinished' : false});
			// var selfView = this;
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
			// console.log(selectedState)
			this.collection.each( function ( model, index){
				// model.set( { 'isFinished' : selectedState } );
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
			// console.log('delete');
			var removeModel = this.collection.where({'isFinished' : true});
			// this.collection.remove(removeModel)
			this.collection.each( function( model ){
				if( model.get('isFinished') === true ){
					model.destroy( { wait : true} );
					//model.destroy( { wait:true } );
				}else{
					console.log(' not delete');
				}
			} )
		},
		updateStatus : function (){
			var remaining = this.collection.where( { 'isFinished' : false } );
			var toDelete = Math.abs( remaining.length - this.collection.length );
			console.log(remaining.length)
			this.ui.itemsLeft.text( remaining.length );
			this.ui.toRemove.text( toDelete );
			if( toDelete === 0 ){
				this.ui.deleteAll.addClass('hide')
			}else{
				this.ui.deleteAll.removeClass('hide')
			}
		},
		updateRemove : function(){
			// console.log('removeView')
			var remaining = this.collection.where({'isFinished' : false});
			this.ui.itemsLeft.text( remaining.length );
			this.ui.toRemove.text( Math.abs( remaining.length - this.collection.length ) );
		}
	});

// staus of the todo i.e how many choices are done.

	TodoApp.StatusView = Marionette.ItemView.extend({
		tagName : 'span',
		className : 'statusContainer',
		template : '#todoStatus-template'
	});



	TodoApp.on( 'initialize:after', function(){
		console.log( 'app is initialized' );
		var todoCollection = new TodoApp.todoCollection();
		// var addTodoItem = new TodoApp.StaticView({
		// 	collection : todoCollection
		// }); //input
		// var todoList = new TodoApp.TodoList();//todo list
		var todos = new TodoApp.TodoList( {
			collection : todoCollection
		} )
		var layout = new TodoApp.TodoLayout();//layout

		var todoStatus = new TodoApp.StatusView();


		// todoCollection.fetch();
		TodoApp.mainRegion.show( layout );
		// layout.addTodo.show( addTodoItem );
		layout.listTodo.show( todos );
		// layout.todoStatus.show( todoStatus );
	} )

	TodoApp.start();