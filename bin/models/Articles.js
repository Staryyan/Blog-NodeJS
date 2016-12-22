/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Parser = require('../Parser');
var parser = new Parser();
var Comments = require('./Comments');

var ArticleSchema = Schema({
    id: String,
    author: String,
    title: String,
    catalog: String,
    date: String,
    content: String
});

ArticleSchema.statics.saveArticle = function (article, callback) {
    article.id = parser.parseArticleIdByDate(article.date);
    article.save(new Article({
        id: article.id,
        author: article.author,
        title: article.title,
        catalog: article.catalog,
        date: article.date,
        content: article.content
    })).then(callback({'succeed': true})).catch(function (error) {
        console.log(error);
        callback({'succeed': false, 'error': 'Error!'});
    });
};

ArticleSchema.statics.getArticlesGroup = function (callback) {
    this.find().sort({'date': -1}).then(function (articles) {
        callback(articles);
    }).catch(function (error) {
        console.log(error);
        callback('Error!');
    });
};

ArticleSchema.statics.commentForArticleById = function (comments, callback) {
    Comments.saveComment(comments, callback);
};

ArticleSchema.statics.getCommentsById = function (id, callback) {
    Comments.getCommentsById(id, callback);
};

var Article = mongoose.model('Articles', ArticleSchema);

module.exports = Article;
