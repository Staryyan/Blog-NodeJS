/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentsSchema = Schema({
    id: String,
    date: String,
    content: String,
    author: String
});

CommentsSchema.statics.saveComment = function (comment, callback) {
    comment.save().then(callback('Succeed!')).catch(function (error) {
        console.log(error);
        callback('Error!');
    })
};

CommentsSchema.statics.getCommentsById = function (id, callback) {
    this.find({id: id}).sort({"date": -1}).then(function (comments) {
        callback(comments);
    }).catch(function (error) {
        console.log(error);
        callback('Error!');
    })
};

var Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
