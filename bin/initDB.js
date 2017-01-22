/**
 * Created by yanzexin on 22/01/2017.
 * All right reserved @Stary 22/01/2017
 */
var mongoose = require('mongoose');
var User = require('./models/User');
var Parser = require('./Parser');
var Article = require('./models/Articles');
var momentJS = require('moment');

mongoose.connect('mongodb://localhost/Blog');
var conn = mongoose.connection;
conn.on('error', error => console.log(error));
conn.on('open', info => console.log('MongoDB Connected!'));


User.register('Administration', new Parser().parsePassword('123456'), function (data) {
    Article.saveArticle(new Article({
        author: 'Administration',
        title: "Welcome to Stary's Blog",
        catalog: 'Welcome',
        date: momentJS().format(),
        content: "欢迎来到Stary's Blog, 在这里你可以尽情share你的想法."
    }), function (data) {
        console.log(data);
        mongoose.disconnect();
    });
});