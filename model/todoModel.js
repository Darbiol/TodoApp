var mongoose = require( 'mongoose' );

//SCHEMA
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var todoSchema = new Schema({
	user_id : ObjectId,
	todo : String,
	isFinished : Boolean,
});

module.exports = mongoose.model('todos', todoSchema);