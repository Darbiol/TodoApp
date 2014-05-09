var todoModel = require( '../model/todoModel' );

exports.getTodo = function ( req, res){
	console.log( 'getting todo' );

	todoModel.find( function ( err, doc){
		if( err ){
			throw err;
			console.log( err );
			res.send( 500, err );
		}else{
			res.send( 200, doc );
		}
	} )
}

exports.addTodo = function ( req, res ){
	console.log( 'adding todo' );
	console.log(req.body)
	new todoModel( {
		todo : req.body.todo,
		isFinished : req.body.isFinished
	} ).save( function ( err, doc){
		if( err ){
			throw err;
			console.log( err );
			res.send( 500, err );
		}else{
			res.send( 200, doc )
		}
	} );

}

exports.updateTodo = function ( req, res ){
	console.log( req.params );
	todoModel.update( {'_id' : req.params.id}, {
		'todo' : req.body.todo,
		'isFinished' : req.body.isFinished
	}, function ( err, doc){
		if( err ){
			throw err;
			console.log( err );
			res.send( 500, err );
		}else{
			res.send( 200, { success : doc } )
		}
	} );

}

exports.removeTodo = function ( req, res){
	console.log( req.params.id );
	todoModel.remove( { '_id' : req.params.id }, function ( err, doc ){
		if( err ){
			throw err;
			console.log( err );
			res.send( 500, err );
		}else{
			// console.log(doc)
			res.send( 200, { success : doc } )
		}
	} )

}