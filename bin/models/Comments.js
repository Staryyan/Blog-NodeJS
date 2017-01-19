/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentsSchema = Schema({
    articleId: String,
    commentId: String,
    date: String,
    content: String,
    author: String,
    hide: Boolean
});

CommentsSchema.statics.saveComment = function (comment, callback) {
    comment.save().then(callback('Succeed!')).catch(function (error) {
        console.log(error);
        callback('Error!');
    })
};

CommentsSchema.statics.getCommentsByArticleId = function (id, callback) {
    this.find({articleId: id}).sort({"date": -1}).then(function (comments) {
        callback(comments);
    }).catch(function (error) {
        console.log(error);
        callback('Error!');
    })
};

CommentsSchema.statics.deleteCommentByCommentId = function (id, callback) {
    console.log(id);
    this.remove({commentId: id}).then(function (data) {
        callback(data);
    }).catch(function (error) {
        console.log(error);
    });
};

CommentsSchema.statics.editCommentByCommentId = function (id, newMsg, callback) {
    console.log(id);
    this.update({commentId: id}, {$set: {content: newMsg}}).then(function (data) {
        callback(data);
    }).catch(function (error) {
        console.log(error);
    })
};

CommentsSchema.statics.hideCommentByCommentId = function (id, callback) {
    console.log(id);
    this.update({commentId: id}, {$set: {hide: true}}).then(function (data) {
        callback(data);
    }).catch(function (error) {
        console.log(error);
    })
};


var Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
