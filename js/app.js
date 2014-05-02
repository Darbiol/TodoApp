

	var TodoApp = new Marionette.Application();

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
		'ui' : {
			'todoInput' : '#todo-list'
		}
		events : {
			'keyup @ui.todoInput' : 'keyCode'
		},
		keyCode : function( e ) {
			if( e.keyCode === 13 ){
				// console.log('asdas')
				this.addTodo();
			}else{
				// console.log('dasd')
			}
		},
		addTodo : function(  ){
			var todoInput = ui.todoInput..val();
			ui.todoInput.append( '<li class="list-item"><span>'+todoInput+'</span></li>' )
			//console.log( todoInput );
			this.clearInputs();
		},
		clearInputs : function (){
			var todoInput = ui.todoInput.val('');
		}
	});

	TodoApp.TodoList = Marionette.ItemView.extend({
		template : '#todoList',
		tagName : 'li',
		className : 'list-item'
	});


	TodoApp.on( 'initialize:after', function(){
		console.log( 'app is initialized' );

		var addTodoItem = new TodoApp.StaticView(); //input
		var todoList = new TodoApp.TodoList();//todo list
		var layout = new TodoApp.TodoLayout();//layout

		TodoApp.mainRegion.show( layout );
		layout.addTodo.show( addTodoItem );
		layout.listTodo.show( todoList );
	} )

	TodoApp.start();