/**
 * Created by yanzexin on 22/12/2016.
 * All right reserved @Stary 22/12/2016
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Blog');
var conn = mongoose.connection;
conn.on('error', error => console.log(error));
conn.once('open', info => console.log('Connected!'));
/**
 * User Test.
 */

// var User = require('./models/User');
//
// User.register("stary", "161518324", function (data) {
//     console.log(data);
// });
//
// User.logInValidate('stary', '161518324', function (data) {
//     console.log(data);
// });

/**
 * Comments Test
 */

// var Comments = require('./models/Comments');
// Comments.saveComment(Comments({
//     id: '1234',
//     date: '1234',
//     content: '12345',
//     author: 'stary'
// }), function (data) {
//     console.log(data);
// });

// Comments.getCommentsById('1234', function (data) {
//     console.log(data);
//     for (ch in data) {
//         console.log(data[ch].author);
//     }
// });


/**
 * Articles Test.
 */

// var Articles = require('./models/Articles');
// Articles.saveArticle(Articles({
//     author: 'Stary',
//     date: '1234',
//     title: '1234',
//     catalog: 'C++',
//     content: 'Test'
// }), function (data) {
//     console.log(data);
// });

// Articles.getArticlesGroup(function (data) {
//     console.log(data);
// });

// Articles.getCommentsById('1234', function (data) {
//     console.log(data);
// });


var Parser = require('./Parser');

var parser = new Parser();

console.log(parser.parseArticleIdByDate('C++'));
console.log(parser.parseArticleIdByDate('JAVA'));
