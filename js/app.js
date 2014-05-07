

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
			addTodo : '#todo-add',
			listTodo : '#todo-list'
		}
	});


	TodoApp.StaticView = Marionette.ItemView.extend({
		template : '#input-todo',
		tagName : 'span',
		// className : 'list-item'
		ui : {
			'todoInput' : 'input[type=text]'
		},
		events : {
			'keyup @ui.todoInput' : 'keyCode'

		},
		keyCode : function( e ) {
			if( e.keyCode === 13 ){
				// console.log('asdas')
				var todoVal = this.ui.todoInput.val();
				this.addTodo( todoVal );
			}else{
				// console.log('dasd')
			}
		},
		addTodo : function( val ){
			var todoInput = val;
			var todoModel = new TodoApp.todoModel( {'todo' : val, 'isFinished' : false});
			var selfView = this;
			// $('#todo-list').append( '<li class="list-item"><span>'+todoInput+'</span></li>' )
			//console.log( todoInput );
			console.log(todoModel);
			todoModel.save({}, {
				success : function(){
					selfView.collection.add(todoModel);
					// console.log('suc')
				},
				error : function(){
					console.log('err')
				},
				wait : true
			});
			this.clearInputs();
		},
		clearInputs : function (){
			var todoInput = this.ui.todoInput.val('');
		}
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
		events : {
			'click @ui.todoDelete' : 'deleteItem',
			'click @ui.finished' : 'toggleDone',
			'dblclick @ui.contents' : 'toggleEdit',
			'focusout @ui.editTodo' : 'editMode'
		},
		initialize : function (){

			if( this.model.get( 'isFinished' ) === true ){
				this.$el.addClass( 'isDone' )
			}else{
				this.$el.addClass( '' )
			}
		},
		deleteItem : function(){
			this.model.destroy();
		},
		toggleDone : function(){
			this.$el.toggleClass( 'isDone' );
			this.model.save({'isFinished' : this.$el.hasClass( 'isDone' ) });
		},
		toggleEdit : function( e ){
			//e.stopPropagation();

			var contents = this.ui.contents.text();

			this.$el.find('span').hide();
			// console.log(this.$el.next())
			this.$el.find('input').attr('type', 'text').val(contents).focus();
			console.log('edit mode');
			console.log(contents);
		},
		editMode : function( e ){
			console.log('viewing edit mdoe')
		}

	})

	TodoApp.TodoList = Marionette.CollectionView.extend({
		tagName : 'ul',
		className : 'non-list',
		itemView : TodoApp.TodoItem
	});


	TodoApp.on( 'initialize:after', function(){
		console.log( 'app is initialized' );
		var todoCollection = new TodoApp.todoCollection();
		var addTodoItem = new TodoApp.StaticView({
			collection : todoCollection
		}); //input
		// var todoList = new TodoApp.TodoList();//todo list
		var todos = new TodoApp.TodoList( {
			collection : todoCollection
		} )
		var layout = new TodoApp.TodoLayout();//layout


		todoCollection.fetch();
		TodoApp.mainRegion.show( layout );
		layout.addTodo.show( addTodoItem );
		layout.listTodo.show( todos );
	} )

	TodoApp.start();