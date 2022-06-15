var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'path' : String,
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'created' : Date,
	'views' : Number,
	'likes' : Number,
	'comments': [{ type: Schema.Types.ObjectId, ref: 'comment' }],
	'likedBy': [{ type: Schema.Types.ObjectId, ref: 'user' }],
	'tags': [],
	'reports' : [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

photoSchema.statics.addComment = function (id, comment, callback) {
	Photo.findById(id).exec(function (err, photo) {
		if (err) {
			return callback(err);
		} else if (!comment) {
			var err = new Error("User not found.");
			err.status = 401;
			return callback(err);
		}
		photo.comments.push(comment._id)
		photo.save();
		callback();
	});
}

var Photo = mongoose.model('photo', photoSchema);

module.exports = Photo;
