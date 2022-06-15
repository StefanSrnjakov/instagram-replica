var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var commentSchema = new Schema({
	'photoId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'photo'
	},
	'userId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'content' : String
});

module.exports = mongoose.model('comment', commentSchema);
